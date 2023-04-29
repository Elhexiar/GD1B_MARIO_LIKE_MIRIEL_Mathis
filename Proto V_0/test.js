class test extends Phaser.Scene {
    constructor() {

        super("test");
    }
    preload() {

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

        this.blocs = this.physics.add.group({allowGravity : false});

        



        main_map = new Cell_Map(16,16,64,carteDuNiveau);
        

        
        for(let y = 0; y < 16; y++){
            for(let x = 0 ; x < 16 ; x++){
                if(carteDuNiveau.layers[1].data[y][x].properties.cell_type == 'neutral'){
                    main_map.Change_cell(x,y,'dirt');
                    
                }
            }
        }
        for(let y = 0; y < 16; y++){
            sprite_list[y]=[]
            for(let x = 0 ; x < 16 ; x++){

                if(main_map.Get_specific_cell_type_name(x,y) == 'dirt'){

                    this.sprite_to_use = Adapt_sprite(x,y,main_map.map_layers);
                    console.log(this.sprite_to_use);
                    sprite_list[y][x] =  this.blocs.create(x*64+32,y*64+32,this.sprite_to_use).setImmovable(true);
                    

                }

            }

        }
        bloc_testeur = this.blocs

        this.input.on('pointerdown', function PointerDown(pointer){

            this.selected_cell_x = (pointer.x - pointer.x%64)/64
            this.selected_cell_y = (pointer.y - pointer.y%64)/64
            console.log("x :",this.selected_cell_x,"|y :",this.selected_cell_y);

            Destroy_selected_cell(this.selected_cell_x,this.selected_cell_y,main_map,sprite_list,bloc_testeur)

        });


        this.player = this.physics.add.sprite(100, 100, 'perso');

        this.player.setGravity(0,11000)
        this.physics.add.collider(this.player, bloc_testeur);
        this.physics.add.collider(this.player, this.calque_mur);
        this.cursors = this.input.keyboard.createCursorKeys();
        

        


        
                //this.sprite_to_use = Adapt_sprite(x,y,this.test.map_layers);

                //sprite_list =  this.blocs.create(x*64+32,y*64+32,this.sprite_to_use).setImmovable(true);
        


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

var bloc_testeur;
var main_map;

class Cell_Map {
    constructor (width,height,pixel_size,tilled_map,physics_group) {

        this.referenced_tilled_map = tilled_map;
        this.map_width = width;
        this.map_height = height;
        
        this.pixel_cell_size = pixel_size;
        
        
        this.map_layers = [];

        

        for(let y = 0; y < height; y++){
        
            this.map_layers[y] = [];
            for(let x = 0 ; x < width ; x++){

                this.map_layers[y][x] = new Cell(y,x,this.pixel_cell_size,'air');

                console.log("y:",y,"|x:",x)

                

                //sprite_list =  physics_group.create(j*64+32,i*64+32,this.sprite_to_use).setImmovable(true);
            }

        }
        
    }

    Change_cell(x,y,type){

        this.map_layers[y][x].Change_cell_self(type)

    }

    Get_specific_cell_type_name(x,y){
        return this.map_layers[y][x].cell_type.name
    }


}

class Cell {

    constructor (y,x,pixel_size,type){

        this.x_map = x;
        this.y_map = y;
        this.x_pixel_coord = x*pixel_size;
        this.y_pixel_coord = y*pixel_size;
        this.cell_type = new Cell_Type(type)

        
    }

    was_hit(){

    }
    
    Update_Texture(){


    }

    Change_cell_self(type){
        this.cell_type.Change_cell_type(type)
    }

}

class Cell_Type {

    constructor (type){

        if(type == 'dirt'){
            this.name = 'dirt';
            this.texture = 'dirt.png';
            this.drop = item_dirt_drop;
            this.is_mineable = true;
            this.hp = 3;
        }else
        if(type == 'air'){
            this.name = 'air'
            this.texture = 'air';
            this.drop = item_dirt_drop;
            this.is_mineable = false;
            this.hp = 1;
        }else{
            this.name = 'none'
            this.texture = 'none';
            this.drop = item_dirt_drop;
            this.is_mineable = false;
            this.hp = 1;
        }
        
    }

    Change_cell_type(type){
        if(type == 'dirt'){
            this.name = 'dirt';
            this.texture = 'dirt.png';
            this.drop = item_dirt_drop;
            this.is_mineable = true;
            this.hp = 3;
        }
        if(type == 'air'){
            this.name = 'air'
            this.texture = 'air';
            this.drop = item_dirt_drop;
            this.is_mineable = false;
            this.hp = 1;
        }


    }


}

class item_dirt_drop {

}


// from Terrain mecanic

function x_from_map(chosen_x,chosen_y,carte){

    //console.log(carte[0][0])
    console.log('look',chosen_y,chosen_x)
    //console.log(carte)

    if(chosen_x>0 && chosen_x<16 && chosen_y > 0 && chosen_y < 16){
        return carte[chosen_y][chosen_x].cell_type
    }else{
        return true
    }


    
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
    if(x_from_map(current_x,current_y-1,Carte_Object).name == 'dirt' ||x_from_map(current_x,current_y-1,Carte_Object) == true){
        //console.log("up");
        up = true
    }
    //if there is blob right
    if(x_from_map(current_x+1,current_y,Carte_Object).name == 'dirt'||x_from_map(current_x,current_y-1,Carte_Object) == true){
        //console.log("right");
        right = true
    }
    //if there is blob down
    if(x_from_map(current_x,current_y+1,Carte_Object).name == 'dirt'||x_from_map(current_x,current_y-1,Carte_Object) == true){
        //console.log("down");
        down = true
    }
    //if there is blob left
    if(x_from_map(current_x-1,current_y,Carte_Object).name == 'dirt'||x_from_map(current_x,current_y-1,Carte_Object) == true){
        //console.log("left");
        left = true
    }



    if(up == true && right == true && left == false && down == false){
        sprite_to_return = blob_sprites.down_corner_left;
        //console.log("down corner left")
    }else if(up == true && right == false && left == true && down == false){
        sprite_to_return = blob_sprites.down_corner_right;
        //console.log("down corner right")
    }else if(up == false && right == true && left == false && down == true){
        sprite_to_return = blob_sprites.up_corner_left;
        //console.log("up corner left")
    }else if(up == false && right == false && left == true && down == true){
        sprite_to_return = blob_sprites.up_corner_right;
        //console.log("up corner right")
    }else if(up == false && right == false && left == false && down == true){
        sprite_to_return = blob_sprites.up_alone
        //console.log("up alone")
    }else if(up == false && right == true && left == false && down == false){
        sprite_to_return = blob_sprites.left_alone
        //console.log("left alone")
    }else if(up == false && right == false && left == true && down == false){
        sprite_to_return = blob_sprites.right_alone
        //console.log("right alone")
    }else if(up == true && right == false && left == false && down == false){
        sprite_to_return = blob_sprites.down_alone
        //console.log("down alone")
    }else if(up == true && right == false && left == false && down == true){
        sprite_to_return = blob_sprites.stretch_vertical
        //console.log("stretch vertical")
    }else if(up == false && right == true && left == true && down == false){
        sprite_to_return = blob_sprites.stretch_horizontal
        //console.log("stretch horizontal")
    }else if(up == false && right == true && left == true && down == true){
        sprite_to_return = blob_sprites.up_only
        //console.log("up only")
    }else if(up == true && right == false && left == true && down == true ){
        sprite_to_return = blob_sprites.right_only
        //console.log("right only")
    }else if(up == true && right == true && left == false && down == true){
        sprite_to_return = blob_sprites.left_only
        //console.log("left only")
    }else if(up == true && right == true && left == true && down == false){
        sprite_to_return = blob_sprites.down_only
        //console.log("down only")
    }

    if(up==true && right==true && left==true && down==true){
        //console.log("WHAT")
        sprite_to_return = blob_sprites.central;
    }

    //console.log("final log = "+sprite_to_return+"for blob :"+blob_counter+ "\t up: "+up+"|right "+right+"|down "+down+"|left"+left);
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

};


function Update_texture_override(carte,bloc_testeur){

    for(let y = 0; y < 16; y++){
        for(let x = 0 ; x < 16 ; x++){

            if(carte.Get_specific_cell_type_name(x,y) == 'dirt'){

                
                this.new_sprite = Adapt_sprite(x,y,carte.map_layers);
                if(this.new_sprite != this.current_sprite){
                    sprite_list[y][x].destroy()
                    sprite_list[y][x] =  bloc_testeur.create(x*64+32,y*64+32,this.sprite_to_use).setImmovable(true);
                }

            }

        }

    }

    
    
}

function Destroy_selected_cell(x,y,carte,sprite_list,physics_bloc){

    console.log(x)
    carte.Change_cell(x,y,'air');

    if(sprite_list[y][x] != undefined){
        sprite_list[y][x].destroy()
    }

    Update_adjacent_sprites(x,y,sprite_list,physics_bloc)
    
    if(y+1 < 16 && y-1 > 0){
        if(main_map.map_layers[y-1][x].cell_type.name == 'dirt'){
        Update_adjacent_sprites(x,y-1,sprite_list,physics_bloc)
        }
        if(main_map.map_layers[y+1][x].cell_type.name == 'dirt'){
        Update_adjacent_sprites(x,y+1,sprite_list,physics_bloc)
        }
    }
    if(x+1 < 16 && y-1 > 0){
        if(main_map.map_layers[y][x-1].cell_type.name == 'dirt'){
        Update_adjacent_sprites(x-1,y,sprite_list,physics_bloc)
        }
        if(main_map.map_layers[y][x+1].cell_type.name == 'dirt'){
        Update_adjacent_sprites(x+1,y,sprite_list,physics_bloc)
        }
    }


};

function Update_adjacent_sprites(x,y,sprite_list,physics_bloc){

    console.log(x,y)

    
        if(y>0 && y <16){
            //above
            if(sprite_list[y-1][x] != undefined && main_map.map_layers[y-1][x].cell_type.name == 'dirt'){
                console.log('update above')
                this.current_sprite = sprite_list[y-1][x].texture.key
                this.new_sprite = Adapt_sprite(x,y-1,main_map.map_layers)

                if(this.current_sprite != this.new_sprite){
                    sprite_list[y-1][x].destroy()
                    sprite_list[y-1][x] = physics_bloc.create(x*64+32,(y-1)*64+32,this.new_sprite).setImmovable(true);
                }

            }
        
            //under
            if(sprite_list[y+1][x] != undefined && main_map.map_layers[y+1][x].cell_type.name == 'dirt'){
                console.log('update under')
                this.current_sprite = sprite_list[y+1][x].texture.key
                this.new_sprite = Adapt_sprite(x,y+1,main_map.map_layers)

                if(this.current_sprite != this.new_sprite){
                    sprite_list[y+1][x].destroy()
                    sprite_list[y+1][x] = physics_bloc.create(x*64+32,(y+1)*64+32,this.new_sprite).setImmovable(true);
                }
                
            }
        }
        

        if(x > 0 && y < 16){
            //to the right
            if(sprite_list[y][x+1] != undefined && main_map.map_layers[y][x+1].cell_type.name == 'dirt'){
                console.log('update right')
                this.current_sprite = sprite_list[y][x+1].texture.key
                this.new_sprite = Adapt_sprite(x+1,y,main_map.map_layers)

                if(this.current_sprite != this.new_sprite){
                    sprite_list[y][x+1].destroy()
                    sprite_list[y][x+1] = physics_bloc.create((x+1)*64+32,y*64+32,this.new_sprite).setImmovable(true);
                }
            }

            //to the left
            if(sprite_list[y][x-1] != undefined && main_map.map_layers[y][x-1].cell_type.name == 'dirt'){
                console.log('update left')
                this.current_sprite = sprite_list[y][x-1].texture.key
                this.new_sprite = Adapt_sprite(x-1,y,main_map.map_layers)

                if(this.current_sprite != this.new_sprite){
                    sprite_list[y][x-1].destroy()
                    sprite_list[y][x-1] = physics_bloc.create((x-1)*64+32,y*64+32,this.new_sprite).setImmovable(true);
                }
            }
        }
    

}