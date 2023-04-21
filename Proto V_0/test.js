class test extends Phaser.Scene {
    constructor() {

        super("test");
    }
    preload() {

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
        this.calque_mur = carteDuNiveau.createLayer("mur",tileset);

        this.blocs = this.physics.add.group({allowGravity : false});



        this.test = new Cell_Map(16,16,64,this.blocs);
        testeur = this.test


    }

    update() { 
        
    }

   
    
};

var testeur;

class Cell_Map {
    constructor (width,height,pixel_size,tilled_map,physics_group) {

        this.referenced_tilled_map;
        this.map_width = width;
        this.map_height = height;
        
        this.pixel_cell_size = pixel_size;
        
        
        this.map_layers = [];

        

        for(let i = 0; i < height; i++){
        
            this.map_layers[i] = [];
            for(let j = 0 ; j < width ; j++){

                this.map_layers[i][j] = new Cell(i,j,this.pixel_cell_size);

                console.log(j,i)

                this.sprite_to_use = Adapt_sprite(j,i,this.map_layers);

                //sprite_list =  physics_group.create(j*64+32,i*64+32,this.sprite_to_use).setImmovable(true);
            }

        }

        
    }


}

class Cell {

    constructor (y,x,pixel_size){

        this.x_map = x;
        this.y_map = y;
        this.x_pixel_coord = x*pixel_size;
        this.y_pixel_coord = y*pixel_size;
        this.cell_type = new Cell_Type()

        
    }

    was_hit(){

    }
    
    Update_Texture(){


    }

}

class Cell_Type {

    constructor (){
        this.name = 'dirt';
        this.texture = 'dirt.png';
        this.drop = item_dirt_drop;
        this.is_mineable = true;
        this.hp = 3;
    }


}

class item_dirt_drop {

}


// from Terrain mecanic

function x_from_map(chosen_x,chosen_y,carte){

    console.log(carte[0][0])
    console.log(chosen_y,chosen_x)
    return carte[chosen_y][chosen_x].cell_type
}

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
    if(x_from_map(current_x,current_y-1,Carte_Object).name == 'dirt'){
        console.log("up");
        up = true
    }
    //if there is blob right
    if(x_from_map(current_x+1,current_y,Carte_Object).name == 'dirt'){
        console.log("right");
        right = true
    }
    //if there is blob down
    if(x_from_map(current_x,current_y+1,Carte_Object).name == 'dirt'){
        console.log("down");
        down = true
    }
    //if there is blob left
    if(x_from_map(current_x-1,current_y,Carte_Object).name == 'dirt'){
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