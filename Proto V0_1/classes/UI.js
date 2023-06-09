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
        this.cursor_ref = this.progress_bar.cursor
        

        console.log(this.surface_ref.EnnemieManager)
        this.ref_EnnemieManager = this.surface_ref.EnnemieManager
        this.progress_text = this.add.text(50,25,"PROGRESS :"+this.progress).setDepth(10)
        this.ressources_text = this.add.text(1400,200 ,"RESSOURCES :"+this.surface_ref.player.ammo)
        this.time_till_next_wave_text = this.add.text(200,25,"TIME UNTIL NEXT WAVE :"+this.time_till_next_wave)



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

        //this.time_till_next_wave_text.setText("TIME UNTIL NEXT WAVE :"+this.surface_ref.EnnemieManager.wave_timer.elapsed)
        
        

    }
}


class progress_bar {
    constructor(scene_ref){

        this.scene = scene_ref
        
        this.x = 800
        this.y = 100
        this.width = 1400

        this.scene.carte.getObjectLayer('limite').objects.forEach((object) => {
    
            object.properties.forEach((limite,i) => {
                //console.log(limite)
                if(limite.value == 'gauche'){

                    this.left_most_pos = object.x
                }
                if(limite.value == 'droite'){
                    this.right_most_pos = object.x
                }
            });
        });

        
        
        this.progress_width = this.right_most_pos-this.left_most_pos
        this.right_most_ennemie_x = 0

        this.progress = 1


        this.bg_sprite = this.scene.add.image(this.x,this.y,'progress_bar_bg')
        this.positive_sprite = this.scene.add.image(this.x,this.y, 'progress_bar_positive')
        this.negative_sprite = this.scene.add.image(this.x,this.y, 'progress_bar_negative')

        this.graphics = this.scene.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { alpha: 0.2 }});

        this.mask = this.scene.add.rectangle(100,60,this.width*this.progress,20)
        this.graphics.strokeRectShape(this.mask)

        
        this.negative_sprite.createGeometryMask(this.mask) 

        //this.graphics.fillRect(100,100,this.width*this.progress,20)
        console.log(this.graphics)
        console.log(this.mask)

        this.cursor = new progress_bar_cursor(this,this.scene)

    }

    UpdateProgression(){

        if(ennemie_number>0){

            this.progress = 0
            this.scene.ref_EnnemieManager.list_of_ennemies.forEach(ennemie => {

                if(ennemie.x>this.left_most_pos){
                    this.ennemieprogress = (ennemie.x-this.left_most_pos)/this.progress_width
                    if(this.ennemieprogress>this.progress){
                        this.progress = this.ennemieprogress
                    }
                }
            });
            if(this.progress>1){
                this.progress = 1
            }

        }else{
            this.progress = 0
        }

        this.scene.progress_text.setText("PROGRESS :"+this.progress)

        this.cursor.sprite.x = this.cursor.x + this.progress*1400
        


        //this.mask = this.graphics.fillRect(100,60,this.width*this.progress,20)
        


    }


}

class progress_bar_cursor{

    constructor(progress_bar,scene_ref){

        this.progress_bar = progress_bar

        this.x = 30
        this.y = 100

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


