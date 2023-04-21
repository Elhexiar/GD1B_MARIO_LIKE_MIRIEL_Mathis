class test extends Phaser.Scene {
    constructor() {

        super("test");
    }
    preload() {
        
    }
    create() {
        this.test = new Cell_Map(10,10,64);
        testeur = this.test
    }

    update() { 
        
    }

   
    
};

var testeur;

class Cell_Map {
    constructor (width,height,pixel_size,tilled_map) {

        this.referenced_tilled_map;
        this.map_width = width;
        this.map_height = height;
        
        this.pixel_cell_size = pixel_size;
        
        
        this.map_layers = [];

        for(let i = 0; i < height; i++){
        
            this.map_layers[i] = [];
            for(let j = 0 ; j < width ; j++){
                this.map_layers[i][j] = new Cell(i,j,this.pixel_cell_size)
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