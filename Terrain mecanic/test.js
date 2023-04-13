var test_list = [];
var test_list_objects = [];
var gid_list =[159,160,161,162,209,210,211,212,259,260,261,262,309,310,311,312]
var corresponding_sprites=['blob 0','blob 1','blob 2','blob 3','blob 4','blob 5','blob 6',
'blob 7','blob 8','blob 9','blob 10','blob 11','blob 12','blob 13','blob 14','blob 15']

var this_blocs_test;

var blob_counter = 0;

var sprite_list = [];

var blob_sprites = {
    up_only : "blob 6",
    up_corner_right : "blob 7",
    right_only : "blob 11",
    down_corner_right : "blob 15",
    down_only : "blob 14",
    down_corner_left : "blob 13",
    left_only : "blob 9",
    up_corner_left : "blob 5",
    default : "blob 12",
    central : "blob 10",
    stretch_horizontal:"blob 2",
    up_alone : "blob 0",
    left_alone : "blob 1",
    right_alone : "blob 3",
    stretch_vertical : "blob 4",
    down_alone : "blob 8",

}
var test_carte = [];

class test extends Phaser.Scene {
    constructor() {

        super("test");
    }
    preload() {
        this.load.image('title_screen_text', 'assets/menu/title_card_text.png');
        this.load.image('title_screen_background', 'assets/menu/title_card_unlit_back.png');
        this.load.image("Phaser_tileset", "assets/Tileset.png");
        this.load.tilemapTiledJSON("carte", "assets/Map_Tiled.json");
        for(var i = 0; i < 16 ; i++){
            this.load.image('blob '+i,'assets/blob '+i+'.png');
        }
        this.load.spritesheet('perso','assets/perso.png',
                { frameWidth: 22, frameHeight: 28 });
        
    }
    create() {

        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "temp tileset",
            "Phaser_tileset"
        );
        const calque_sol = carteDuNiveau.createLayer("sol",tileset);
        this.calque_mur = carteDuNiveau.createLayer("mur",tileset);
        const calque_pits = carteDuNiveau.createLayer('sur sol',tileset);

        test_carte = carteDuNiveau;

        this.blocs = this.physics.add.group({allowGravity : false});

        this.test_string ="";
        this.sprite_to_use = corresponding_sprites.default;

        carteDuNiveau.layers[1].data.forEach((tile_array,Forindex) =>{

            tile_array.forEach((tile,pindex)=>{
                this.test_string = this.test_string + "x:"+tile.x+"y:"+tile.y+"[" + tile.index +"\t]";
                if(tile.index == 261){
                    this.sprite_to_use = Adapt_sprite(tile.x,tile.y,carteDuNiveau);
                    console.log(this.sprite_to_use);
                    sprite_list =  this.blocs.create(tile.x*64+32,tile.y*64+32,this.sprite_to_use).setImmovable(true);
                }
            });
            console.log(this.test_string);
            this.test_string = "";
        })

        carteDuNiveau.getObjectLayer('terre').objects.forEach((bloc,index) => {

            
            console.log(bloc.gid);
            this.current_gid = 309;
            this.selected_sprite = 12;
            console.log(index)
            
            
            gid_list.forEach((g,i)=>{
                if(bloc.gid == g){this.current_gid = g;this.selected_sprite = i}
            })
            

            test_list[index] =  this.blocs.create(bloc.x+32,bloc.y-32,'blob '+this.selected_sprite);
            
        });


        this.player = this.physics.add.sprite(100, 100, 'perso');
        //this.player.allowGravity(true)
        //this.blocs.body.setPushable( false)
        this.player.setGravity(0,8000)
        this.physics.add.collider(this.player, this.blocs);
        this.physics.add.collider(this.player, this.calque_mur);
        this.cursors = this.input.keyboard.createCursorKeys();

        this_blocs_test = this.blocs;


        
    }

    update() { 

        if (this.cursors.right.isDown)                           
                    {                                         
                        this.player.setVelocityX(200);                                                 
                    } 
                else if (this.cursors.left.isDown)                           
                    {                                     
                        this.player.setVelocityX(-200);                                                          
                    }                                                   
                else {
                    this.player.setVelocityX(0);
                }
                if (this.cursors.up.isDown)                           
                    {                                       
                        this.player.setVelocityY(-500);                                               
                    }
                                                                   
                else if (this.cursors.down.isDown)                           
                    {                                      
                        this.player.setVelocityY(500);                                                            
                    } 

                else {
                    
                    this.player.setVelocityY(0);
                }

        
    }

   
    
};


function Adapt_sprite(current_x,current_y,Carte_Object){

    

    //console.log(Carte_Object);
    //console.log(current_x);
    //console.log(current_y);

    sprite_to_return = corresponding_sprites.default;
    up = false;
    right = false;
    down = false;
    left = false;
    //if there is blob up
    if(x_from_map(current_x,current_y-1,Carte_Object).index == 261){
        console.log("up");
        up = true
    }
    //if there is blob right
    if(x_from_map(current_x+1,current_y,Carte_Object).index == 261){
        console.log("right");
        right = true
    }
    //if there is blob down
    if(x_from_map(current_x,current_y+1,Carte_Object).index == 261){
        console.log("down");
        down = true
    }
    //if there is blob left
    if(x_from_map(current_x-1,current_y,Carte_Object).index == 261){
        console.log("left");
        left = true
    }



    if(up == true && right == true && left == false && down == false){
        sprite_to_return = blob_sprites.down_corner_left;
        console.log("down corner left")
    }else if(up == true && right == false && left == true && down == false){
        sprite_to_return = blob_sprites.down_corner_right;
        console.log("down corner right")
    }else if(up == false && right == true && left == false && down == true){
        sprite_to_return = blob_sprites.up_corner_left;
        console.log("up corner left")
    }else if(up == false && right == false && left == true && down == true){
        sprite_to_return = blob_sprites.up_corner_right;
        console.log("up corner right")
    }else if(up == false && right == false && left == false && down == true){
        sprite_to_return = blob_sprites.up_alone
        console.log("up alone")
    }else if(up == false && right == true && left == false && down == false){
        sprite_to_return = blob_sprites.left_only
        console.log("left only")
    }else if(up == false && right == false && left == true && down == false){
        sprite_to_return = blob_sprites.right_alone
        console.log("right alone")
    }else if(up == true && right == false && left == false && down == false){
        sprite_to_return = blob_sprites.down_alone
        console.log("down alone")
    }else if(up == true && right == false && left == false && down == true){
        sprite_to_return = blob_sprites.stretch_vertical
        console.log("stretch vertical")
    }else if(up == false && right == true && left == true && down == false){
        sprite_to_return = blob_sprites.stretch_horizontal
        console.log("stretch horizontal")
    }else if(up == false && right == true && left == true && down == true){
        sprite_to_return = blob_sprites.up_only
        console.log("up only")
    }else if(up == true && right == false && left == true && down == true ){
        sprite_to_return = blob_sprites.right_only
        console.log("right only")
    }else if(up == true && right == true && left == false && down == true){
        sprite_to_return = blob_sprites.left_only
        console.log("left only")
    }else if(up == true && right == true && left == true && down == false){
        sprite_to_return = blob_sprites.down_only
        console.log("down only")
    }

    if(up==true && right==true && left==true && down==true){
        console.log("WHAT")
        sprite_to_return = blob_sprites.central;
    }

    console.log("final log = "+sprite_to_return+"for blob :"+blob_counter+ "\t up: "+up+"|right "+right+"|down "+down+"|left"+left);
    //console.log("test log = "+blob_sprites.default);

    blob_counter = blob_counter +1;

    return sprite_to_return

};


function x_from_map(chosen_x,chosen_y,carte){

    //console.log(carte.layers[1].data[chosen_y][chosen_x])
    return carte.layers[1].data[chosen_y][chosen_x]
}

