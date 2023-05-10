class surface extends Phaser.Scene {
    constructor() {

        super("surface");
    }
    preload() {

        this.load.image("Tileset_Surface", "ressources/Tiled/tileset surface.png");
        this.load.tilemapTiledJSON("carte", "ressources/Tiled/Surface.json");
        this.load.image("temp bg", "ressources/Tiled/surface temp bg.png")

        this.load.spritesheet('perso','ressources/assets/perso.png',
                { frameWidth: 22, frameHeight: 28 });
        


        
        
    }
    create() {

        this.background = this.add.image(3200/2,700/2,'temp bg');
        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "tileset surface",
            "Tileset_Surface"
        );
        this.calque_sol = carteDuNiveau.createLayer("sol",tileset);
        
        this.calque_sol.setCollisionByProperty({estSolide : true})



         

        
        
        
        this.player = new Player('perso',100,100,this,this.calque_sol);
        test_var = this.player

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player.player_sprite,this.calque_sol);
        //this.physics.add.collider(this.player.player_sprite,this.test);



        //Gestion Camera
        this.cameras.main.startFollow(this.player.player_sprite,false,1,1,0,CAMERA_OFFSET); 
        this.cameras.main.zoom = 1.3;

        


    }

    update() { 

        this.player_input_dic = UpdatePlayerInput(this.cursors)

        this.player.UpdatePlayerMovements(this.player_input_dic)

       
        
    }

   
    
};

function UpdatePlayerInput(cursor){

    //console.log(cursor)

    input_dic = {
        right: false,
        left:false,
        up:false,
        down:false
    }
    if(cursor.right.isDown){
        input_dic.right = true
    }
    if(cursor.left.isDown){
        input_dic.left = true
    }
    if(cursor.down.isDown){
        input_dic.down = true
    }
    if(cursor.up.isDown){
        input_dic.up = true
    }

    return input_dic
    

}


var test_var

var CAMERA_OFFSET = 220