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
        //this.add.text(500,500,'TEST')

        Tuto_ref = this




    }

    update(){

        
        

    }
}

var Tuto_ref