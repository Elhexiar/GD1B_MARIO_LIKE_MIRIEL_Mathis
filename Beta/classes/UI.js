class UI_Scene extends Phaser.Scene {
    constructor() {

        super("UI_Scene");
    }
    init(data){

        
        this.surface_ref = data.scene
        this.surface_ref.UI_ref = this
        this.carte = data.carte
        //console.log(this.carte)
    }
    preload() {
        this.load.image('progress_bar_bg','ressources/assets/UI/progress_bar_bg.png')
        this.load.image('progress_bar_negative','ressources/assets/UI/progress_bar_negative.png')
        this.load.image('progress_bar_positive','ressources/assets/UI/progress_bar_positive.png')
        this.load.image('progress_cursor','ressources/assets/progress_cursor.png')
        this.load.spritesheet('wave timer','ressources/assets/UI/wave timer visual.png',
        {frameWidth:150,frameHeight:50});
        
    }
    create() {

        this.x = 0
        this.y = 0
        this.active = true
        this.player_above = true
        this.underground_ref = 'none yet'

        this.time_till_next_wave = 0
        
        
        //this.nb_component = 0
        this.progress_bar = new progress_bar(this)

        this.wave_timer_visual = this.add.sprite(800,150,"wave timer").setScale(2,2)
        this.cursor_ref = this.progress_bar.cursor
        

        console.log(this.surface_ref.EnnemieManager)
        this.ref_EnnemieManager = this.surface_ref.EnnemieManager
        this.progress_text = this.add.text(50,25,"PROGRESS :"+this.progress,).setDepth(10).setFont("Comic Sans MS").setFontSize(32);

        this.ressources_text = this.add.text(1400,200 ,"RESSOURCES :"+this.surface_ref.player.ammo)
        this.time_till_next_wave_text = this.add.text(600,25,"TIME UNTIL NEXT WAVE :"+this.time_till_next_wave)



    }

    update(){

        this.progress_bar.UpdateProgression()
        if(this.player_above == true){
            this.ressources_text.setText("RESSOURCES :"+this.surface_ref.player.ammo)
        }else{
            if(this.underground_ref.player != undefined){
            this.ressources_text.setText("RESSOURCES :"+this.underground_ref.player.ammo)
            }
        }

        if(this.surface_ref.EnnemieManager.wave_timer !=0){
        this.time_till_next_wave_text.setText("TIME UNTIL NEXT WAVE :"+parseInt(this.surface_ref.EnnemieManager.wave_timer.elapsed/this.surface_ref.EnnemieManager.wave_timer.delay*100) +"%")
        }
        

    }
}


class progress_bar {
    constructor(scene_ref){

        this.scene = scene_ref
        
        this.x = 800
        this.y = 100
        this.width = 1400
        this.left =  new Object
        this.right = new Object

        this.scene.carte.getObjectLayer('limite gauche').objects.forEach((object) => {
    
            object.properties.forEach((limite,i) => {
                //console.log(limite)
                if(limite.value == 'gauche'){

                    this.left.left_most_pos = object.x
                    console.log(this.left.left_most_pos)
                }
                if(limite.value == 'droite'){
                    this.left.right_most_pos = object.x
                }
            });
        });
        this.scene.carte.getObjectLayer('limite droite').objects.forEach((object) => {
    
            object.properties.forEach((limite,i) => {
                //console.log(limite)
                if(limite.value == 'gauche'){

                    this.right.left_most_pos = object.x
                }
                if(limite.value == 'droite'){
                    this.right.right_most_pos = object.x
                }
            });
        });
        console.log(this.left.left_most_pos)

        
        
        this.left.progress_width = this.left.right_most_pos-this.left.left_most_pos
        this.right.progress_width = this.right.right_most_pos-this.right.left_most_pos
        this.right_most_ennemie_x = 0

        this.progress_left = 1


        this.bg_sprite = this.scene.add.image(this.x,this.y,'progress_bar_bg')
        this.positive_sprite = this.scene.add.image(this.x,this.y, 'progress_bar_positive')
        this.negative_sprite = this.scene.add.image(this.x,this.y, 'progress_bar_negative')

        this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { alpha: 0.2 }});

        //this.mask = this.scene.add.rectangle(100,60,this.width*this.progress,20)
        //this.graphics.strokeRectShape(this.mask)

        
        //this.negative_sprite.createGeometryMask(this.mask) 

        //this.graphics.fillRect(100,100,this.width*this.progress,20)
        //console.log(this.graphics)
        //console.log(this.mask)

        this.cursor_left = new progress_bar_cursor(30,100,this,this.scene);
        
        this.cursor_right = new progress_bar_cursor(1570,100,this,this.scene)

    }

    UpdateProgression(){

        if(ennemie_number>0){

            this.progress_left = 0
            //this.cursor_right = 0
            this.scene.ref_EnnemieManager.list_of_ennemies.forEach(ennemie => {

                if(ennemie.x < 3000){
                    //console.log(ennemie.x,this.left.left_most_pos)
                    if(ennemie.x>this.left.left_most_pos){
                        
                        this.left.ennemieprogress = (ennemie.x-this.left.left_most_pos)/this.left.progress_width
                        if(this.left.ennemieprogress>this.left.progress_left){
                            this.left.progress_left = this.left.ennemieprogress
                        }
                    }

                }
                if(ennemie.x>3000){
                    if(ennemie.x<this.right.right_most_pos){
                        
                        this.right.ennemieprogress = -(ennemie.x-this.right.right_most_pos)/this.right.progress_width
                        //.log(this.right.ennemieprogress)
                        if(this.right.ennemieprogress>this.right.progress_left){
                            this.right.progress_left = this.right.ennemieprogress
                            //console.log(this.right.ennemieprogress)
                        }
                    }

                }
                
            });
            if(this.left.progress_left>1){
                this.left.progress_left = 1
            }
            if(this.right.progress_left>1){
                this.right.progress_left = 1
            }

        }else{
            this.left.progress_left = 0
            this.right.progress_left = 0
        }

        this.scene.progress_text.setText("PROGRESS :"+this.progress)

        this.cursor_left.sprite.x = (this.cursor_left.x + this.left.progress_left*1400)/2
        this.cursor_right.sprite.x = (this.cursor_right.x - this.right.progress_left*1400)/2 +800
        


        //this.mask = this.graphics.fillRect(100,60,this.width*this.progress,20)
        


    }


}

class progress_bar_cursor{

    constructor(x,y,progress_bar,scene_ref){

        this.progress_bar = progress_bar

        this.x = x
        this.y = y

        this.scene = scene_ref
        this.sprite = this.scene.add.image(this.x,this.y,"progress_cursor").setDepth(12)

    }


}

class CursorOverlay {

    constructor(){

        this.x = pointer_info.x
        this.y = pointer_info.y
        this.visible = false

        this.y_max = 5000
        
    }

    Update_Overlay_Behaviour(){
        
    }

}

var UI_ref


class TowerGhost {

    constructor(){

        this.x = 0
        this.y = 0
        this.visible = false


    }

    show(){
        this.visible = true
        this.sprite.visible = true
    }

    hide(){
        this.visible = false
        this.sprite.visible = false
    }

    updateGhostTower(pointer){

        this.x = pointer.x
        this.y = pointer.y

    }


}
