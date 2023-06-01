class Cell_Map {
    constructor (width,height,pixel_size,tilled_map,physics_group_ref) {

        this.referenced_tilled_map = tilled_map;
        this.map_width = width;
        this.map_height = height;
        this.physics_group = physics_group_ref
       
        
        this.pixel_cell_size = pixel_size;
        
        
        this.map_layers = [];

        

        for(let y = 0; y < height; y++){
        
            this.map_layers[y] = [];
            for(let x = 0 ; x < width ; x++){

                this.map_layers[y][x] = new Cell(y,x,this.pixel_cell_size,'air',this.physics_group,this);

                //console.log("y:",y,"|x:",x)

                

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

    constructor (y,x,pixel_size,type,physics_group_ref,map_ref){

        this.x_map = x;
        this.y_map = y;
        this.x_pixel_coord = x*pixel_size;
        this.y_pixel_coord = y*pixel_size;
        this.cell_type = new Cell_Type(type)
        this.cell_sprite = 'none'
        this.damage_sprite = "undamaged"
        this.physics_group = physics_group_ref
        this.main_map = map_ref

        
    }

    was_hit(player){
        if(this.cell_type.is_mineable == true){
            
            //console.log(this)
            this.cell_type.hp = this.cell_type.hp-1
            //console.log(this)
            
            if(this.cell_type.hp <= 0){
                
                this.damage_sprite.destroy()
                Destroy_selected_cell(this.x_map,this.y_map,this.main_map,this.physics_group)
                player.ammo = player.ammo +1

                console.log("ammo =",player.ammo)
                if(player.ammo > player.carrying_capacity){
                    player.ammo = player.carrying_capacity
                }
            }
            if(this.cell_type.hp == 5){

                this.damage_sprite.anims.play('1HP')
                
            }
            if(this.cell_type.hp == 10){

                this.damage_sprite.anims.play('2HP')

            }
            if(this.cell_type.hp == 14){
                this.damage_sprite = this.physics_group.create(this.x_pixel_coord+32,this.y_pixel_coord+32,'Damage_Sprite').setDepth(5).setImmovable(true)
                //this.damage_sprite.anims.play('3HP')
                
            }
        }

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
            this.hp = 15;
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
            this.hp = 15;
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
    //console.log('look',chosen_y,chosen_x)
    //console.log(carte)

    if(chosen_x>0 && chosen_x<111 && chosen_y > 0 && chosen_y < 35){
        return carte[chosen_y][chosen_x].cell_type
    }else{
        return false
    }


    
}

function Adapt_sprite(current_x,current_y,Carte_Object){

    

    //console.log(Carte_Object);
    //console.log(current_x);
    //console.log(current_y);

    sprite_to_return = 'blob 15';
    up = false;
    right = false;
    down = false;
    left = false;
    //if there is blob up
    if(x_from_map(current_x,current_y-1,Carte_Object).name == 'dirt' ||x_from_map(current_x,current_y-1,Carte_Object) == false){
        //console.log("up");
        up = true
    }
    //if there is blob right
    if(x_from_map(current_x+1,current_y,Carte_Object).name == 'dirt'||x_from_map(current_x,current_y-1,Carte_Object) == false){
        //console.log("right");
        right = true
    }
    //if there is blob down
    if(x_from_map(current_x,current_y+1,Carte_Object).name == 'dirt'||x_from_map(current_x,current_y-1,Carte_Object) == false){
        //console.log("down");
        down = true
    }
    //if there is blob left
    if(x_from_map(current_x-1,current_y,Carte_Object).name == 'dirt'||x_from_map(current_x,current_y-1,Carte_Object) == false){
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

    //blob_counter = blob_counter +1;

    return sprite_to_return

};

var blob_sprites = {
    up_only : "blob 1",
    up_corner_right : "blob 2",
    right_only : "blob 6",
    down_corner_right : "blob 10",
    down_only : "blob 9",
    down_corner_left : "blob 8",
    left_only : "blob 4",
    up_corner_left : "blob 0",
    default : "blob 15",
    central : "blob 5",
    stretch_horizontal:"blob 13",
    up_alone : "blob 3",
    left_alone : "blob 12",
    right_alone : "blob 14",
    stretch_vertical : "blob 7",
    down_alone : "blob 11",

};

function Destroy_selected_cell(x,y,main_map,physics_bloc){

    
    main_map.Change_cell(x,y,'air');

    if(main_map.map_layers[y][x].cell_sprite != 'none' && x>=0 && x <= 111 && y >= 0 && y <= 35){
        //console.log("destroying cell, x:",x,"|y:",y)
        main_map.map_layers[y][x].cell_sprite.destroy()
        Update_adjacent_sprites(x,y,main_map,physics_bloc)
    
        if(y+1 < 32 && y-1 > 0){
            if(main_map.map_layers[y-1][x].cell_type.name == 'dirt'){
            Update_adjacent_sprites(x,y-1,main_map,physics_bloc)
            }
            if(main_map.map_layers[y+1][x].cell_type.name == 'dirt'){
            Update_adjacent_sprites(x,y+1,main_map,physics_bloc)
            }
        }
        if(x+1 < 48 && y-1 > 0){
            if(main_map.map_layers[y][x-1].cell_type.name == 'dirt'){
            Update_adjacent_sprites(x-1,y,main_map,physics_bloc)
            }
            if(main_map.map_layers[y][x+1].cell_type.name == 'dirt'){
            Update_adjacent_sprites(x+1,y,main_map,physics_bloc)
            }
        }
    }

    


};

function Update_adjacent_sprites(x,y,main_map,physics_bloc){

    //console.log("enter Update")

    
        if(y>0 && y <main_map.map_height){
            //console.log("in range y")
            //above
            if(main_map.map_layers[y-1][x].cell_sprite != 'none' && main_map.map_layers[y-1][x].cell_type.name == 'dirt'){
                //console.log('update above')
                this.current_sprite = main_map.map_layers[y-1][x].cell_sprite.texture.key
                this.new_sprite = Adapt_sprite(x,y-1,main_map.map_layers)

                if(this.current_sprite != this.new_sprite){
                    main_map.map_layers[y-1][x].cell_sprite.destroy()
                    main_map.map_layers[y-1][x].cell_sprite = physics_bloc.create(x*64+32,(y-1)*64+32,this.new_sprite).setImmovable(true);
                }

            }
        
            //under
            if(main_map.map_layers[y+1][x].cell_sprite != 'none' && main_map.map_layers[y+1][x].cell_type.name == 'dirt'){
                //console.log('update under')
                this.current_sprite = main_map.map_layers[y+1][x].cell_sprite.texture.key
                this.new_sprite = Adapt_sprite(x,y+1,main_map.map_layers)

                if(this.current_sprite != this.new_sprite){
                    main_map.map_layers[y+1][x].cell_sprite.destroy()
                    main_map.map_layers[y+1][x].cell_sprite = physics_bloc.create(x*64+32,(y+1)*64+32,this.new_sprite).setImmovable(true);
                }
                
            }
        }
        

        if(x > 0 && y < main_map.map_width){
            //to the right
            //console.log("in range x")
            if(main_map.map_layers[y][x+1].cell_sprite != 'none' && main_map.map_layers[y][x+1].cell_type.name == 'dirt'){
                //console.log('update right')
                this.current_sprite = main_map.map_layers[y][x+1].cell_sprite.texture.key
                this.new_sprite = Adapt_sprite(x+1,y,main_map.map_layers)

                if(this.current_sprite != this.new_sprite){
                    main_map.map_layers[y][x+1].cell_sprite.destroy()
                    main_map.map_layers[y][x+1].cell_sprite = physics_bloc.create((x+1)*64+32,y*64+32,this.new_sprite).setImmovable(true);
                }
            }

            //to the left
            if(main_map.map_layers[y][x-1].cell_sprite != 'none' && main_map.map_layers[y][x-1].cell_type.name == 'dirt'){
                //console.log('update left')
                this.current_sprite = main_map.map_layers[y][x-1].cell_sprite.texture.key
                this.new_sprite = Adapt_sprite(x-1,y,main_map.map_layers)

                if(this.current_sprite != this.new_sprite){
                    main_map.map_layers[y][x-1].cell_sprite.destroy()
                    main_map.map_layers[y][x-1].cell_sprite = physics_bloc.create((x-1)*64+32,y*64+32,this.new_sprite).setImmovable(true);
                }
            }
        }
    

}