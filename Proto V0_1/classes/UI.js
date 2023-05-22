

class UI_Scene extends Phaser.Scene {
    constructor() {

        super("UI_Scene");
    }
    init(data){

        
        this.surface_ref = data.scene
        this.carte = data.carte
        //console.log(this.carte)
    }
    preload() {
        this.load.image('progress_bar_bg','ressources/assets/UI/progress_bar_bg.png')
        this.load.image('progress_bar_negative','ressources/assets/UI/progress_bar_negative.png')
        this.load.image('progress_bar_positive','ressources/assets/UI/progress_bar_positive.png')
       
        
    }
    create() {

        this.x = 0
        this.y = 0
        this.active = true
        
        
        //this.nb_component = 0
        this.progress_bar = new progress_bar(this)
        this.cursor_ref = this.progress_bar.cursor
        UI_ref = this

        console.log(this.surface_ref.EnnemieManager)
        this.ref_EnnemieManager = this.surface_ref.EnnemieManager



    }

    update(){

        this.progress_bar.UpdateProgression()

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

        this.cursor = new progress_bar_cursor(this.scene)

    }

    UpdateProgression(){

        if(ennemie_number>0){
            this.scene.ref_EnnemieManager.list_of_ennemies.forEach(ennemie => {

                
            
            });

        }else{
            //this.progress = 0
        }

        //this.mask = this.graphics.fillRect(100,60,this.width*this.progress,20)
        


    }


}

class progress_bar_cursor{

    constructor(scene_ref){

        this.scene = scene_ref
        this.sprite

    }


}

var UI_ref