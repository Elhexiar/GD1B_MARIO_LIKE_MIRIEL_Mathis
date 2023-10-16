class Start_scene extends Phaser.Scene {
    constructor() {

        super("Start_scene");
    }
    init(data){

        

    }
    preload() {

        this.load.image("Start_sky", "ressources/assets/start/Start sky.png");
        this.load.image("Start_dune", "ressources/assets/start/Start dune.png");
        this.load.image("Start_dune02", "ressources/assets/start/Start dune02.png");
        this.load.image("cave", "ressources/assets/start/cave.png"); 
        this.load.image("play", "ressources/assets/start/play button.png");     
        this.load.image("title", "ressources/assets/start/title.png");      
        
    }
    create() {

        this.t

        this.add.image(800,450,'Start_sky').setScale(2,2);
        this.dune = this.add.image(800,550,'Start_dune').setScale(1.5,1.5)
        this.cave = this.add.image(800,750,'cave').setScale(2,2)
        this.dune02 = this.add.image(800,850,'Start_dune02').setScale(2,2)

        this.title = this.add.image(800,250,'title').setScale()
        
        this.play_button = this.add.image(800,550,'play').setScale(2,2).setInteractive()

        this.play_button.scene_ref = this
        this.play_button.setInteractive()
        this.play_button.on('pointerdown', function() {
            
            this.scene_ref.scene.start('surface')
         }, this.play_button);
        this.t = 1
        this.t02 = 1
        
        //this.add.text(500,500,'TEST')

        Tuto_ref = this




    }

    update(){

        this.t = this.t +0.001
        this.t02 = this.t02 + 0.005

        this.dune02.x = -Math.sin(this.t02+5)*80 + 800
        this.dune.x = Math.sin(this.t)*100 + 800
        

    }
}