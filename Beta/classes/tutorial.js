class Tutorial_scene extends Phaser.Scene {
    constructor() {

        super("Tutorial_scene");
    }
    init(data){

        console.log(data)

        this.surface_ref = data
        console.log(this.surface_ref)

        this.surface_ref.ref_to_tuto = this

    }
    preload() {

        this.load.image("Window", "ressources/assets/tuto/Window 01.png");

       
        
    }
    create() {

        this.main_window = this.add.image(800,450,'Window');
        this.main_window.scene_ref = this
        this.main_window.setInteractive()
        this.main_window.on('pointerdown', function() {
            
            this.scene_ref.surface_ref.scene.resume('surface')
            this.destroy()
         }, this.main_window);
        //this.add.text(500,500,'TEST')

        this.show_window_02 = false

        Tuto_ref = this




    }

    update(){

        
        

    }
}

var Tuto_ref