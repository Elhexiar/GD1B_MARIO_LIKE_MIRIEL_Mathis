class surface extends Phaser.Scene {
    constructor() {

        super("surface");
    }
    preload() {

        this.load.image("Tileset_Surface", "ressources/Tiled/tileset surface.png");
        this.load.tilemapTiledJSON("carte", "ressources/Tiled/Surface.json");
        this.load.image("temp bg", "ressources/Tiled/surface temp bg.png")
        this.load.image("porte", "ressources/assets/porte.png")

        this.load.spritesheet('perso','ressources/assets/perso.png',
                { frameWidth: 22, frameHeight: 28 });
        


        
        
    }
    create() {

        this.background = this.add.image(WORLD_DIMENSION.width/2,WORLD_DIMENSION.height/2,'temp bg');
        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "tileset surface",
            "Tileset_Surface"
        );
        this.calque_sol = carteDuNiveau.createLayer("sol",tileset);
        
        this.calque_sol.setCollisionByProperty({estSolide : true})
        

        
        this.porte = this.physics.add.group({allowGravity : false})

        carteDuNiveau.getObjectLayer('porte').objects.forEach((porte) => {
    
            console.log(porte)
            this.porte_to_underground = new Porte(porte.x,porte.y-64,'porte',this.porte)
        });

        

         

        
        
        
        this.player = new Player('perso',100,100,this,this.calque_sol);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player.player_sprite,this.calque_sol);
        //this.physics.add.collider(this.player.player_sprite,this.test);



        //Gestion Camera
        this.cameras.main.startFollow(this.player.player_sprite,false,0.2,0.2,0,CAMERA_OFFSET); 
        this.cameras.main.zoom = 1;

        this.physics.world.setBounds(0, 0, WORLD_DIMENSION.width,WORLD_DIMENSION.height);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, WORLD_DIMENSION.width, WORLD_DIMENSION.height);

        console.log(this.player.player_sprite)
        console.log(this.porte_to_underground.sprite)


        this.physics.add.overlap(this.player.player_sprite,this.porte_to_underground.sprite,PlayerOverlapsUndergroundDoor,null,this);


        this.player.player_sprite.setCollideWorldBounds() 


    }

    update() { 

        this.player_input_dic = UpdatePlayerInput(this.cursors)

        this.player.UpdatePlayerMovements(this.player_input_dic)

        test_player = this.player
        test_porte = this.porte_to_underground

       
        
        if(this.cursors.shift.isDown && underground_door_overlapp){
            this.scene.start('underground_level_01')
        }

        underground_door_overlapp = false
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

var test_player
var test_porte 
var underground_door_overlapp = false

var test_var

var CAMERA_OFFSET = 400

var WORLD_DIMENSION = {
    width : 3200,
    height : 766
}

function PlayerOverlapsUndergroundDoor(scene){

    underground_door_overlapp = true

    

}