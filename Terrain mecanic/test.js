class test extends Phaser.Scene {
    constructor() {

        super("test");
    }
    preload() {
        this.load.image('title_screen_text', 'assets/menu/title_card_text.png');
        this.load.image('title_screen_background', 'assets/menu/title_card_unlit_back.png');
        this.load.image("Phaser_tileset", "assets/Tileset.png");
        this.load.tilemapTiledJSON("carte", "assets/Map_Tiled.json");
        
    }
    create() {

        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "temp tileset",
            "Phaser_tileset"
        );
        const calque_sol = carteDuNiveau.createLayer("sol",tileset);
        const calque_mur = carteDuNiveau.createLayer("mur",tileset);
        const calque_pits = carteDuNiveau.createLayer('sur sol',tileset);

        
    }


    update() {

     
          
        
        
    }

   
    
};