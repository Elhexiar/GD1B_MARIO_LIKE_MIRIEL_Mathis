
class underground_level_01 extends Phaser.Scene {
    constructor(config) {

        super("underground_level_01");
    }
    init(data){

    }
    preload() {

        this.load.tilemapTiledJSON("underground_map_json", "ressources/Tiled/underground_level_01.json");
        this.load.image("Underground_Tileset_Image", "ressources/Tiled/underground tileset.png");
        for(var i = 0; i < 16 ; i++){
            this.load.image('blob '+i,'ressources/assets/dirt/dirt'+i+'.png');
        }
        
        
    }
    create() {

        const carteTilled_Underground = this.add.tilemap("underground_map_json");
        const tileset = carteTilled_Underground.addTilesetImage(
            "underground tuile",
            "Underground_Tileset_Image"
        );

        console.log(carteTilled_Underground);
        
        this.calque_fond = carteTilled_Underground.createLayer("fond",tileset)
        //this.calque_dirt = carteTilled_Underground.createLayer("dirt",tileset)
        this.calque_mur = carteTilled_Underground.createLayer("mur",tileset);
        
        

        test_carte = carteTilled_Underground

        

        this.player_spawn_point = getPlayerSpawnPoint(carteTilled_Underground)
        console.log(this.player_spawn_point)
        this.player = new Player('perso',this.player_spawn_point.x,this.player_spawn_point.y,this)

        console.log(this.player)
        this.cameras.main.startFollow(this.player.player_sprite,false,0.2,1,0); 
        this.cameras.main.zoom = 1;

        this.calque_mur.setCollisionByProperty({estSolide : true})
        this.physics.add.collider(this.player.player_sprite,this.calque_mur);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.dirt_blocs = this.physics.add.group({allowGravity : false})


        this.dirt_map = new Cell_Map(48,32,64,carteTilled_Underground,this.dirt_blocs)
        

        test_dirt_map = this.dirt_map
        for(let y = 0; y < 32; y++){
            for(let x = 0 ; x < 48 ; x++){

                console.log('x :',x,'|y :',y)

                carteTilled_Underground.layers.forEach((layer,index) => {
                    
                    if(layer.name == 'dirt'){
                        console.log(layer)
                        if(layer.data[y][x].properties.cell_type == 'dirt'){
                            this.dirt_map.Change_cell(x,y,'dirt');
                            console.log('xd')
                        }
                    }                        
            
                });

            }
        }
        for(let y = 0; y < 32; y++){
            
            for(let x = 0 ; x < 48 ; x++){

                if(this.dirt_map.Get_specific_cell_type_name(x,y) == 'dirt'){

                    this.sprite_to_use = Adapt_sprite(x,y,this.dirt_map.map_layers);
                    console.log(this.sprite_to_use,'in x: ',x,'|y :',y);
                    this.dirt_map.map_layers[y][x].cell_sprite =  this.dirt_blocs.create(x*64+32,y*64+32,this.sprite_to_use).setImmovable(true);
                    

                }

            }

        }
        


        

        

        test_dirt_map = this.dirt_map
    }

    update() { 

        this.player_input_dic = UpdatePlayerInput(this.cursors)

        this.player.UpdatePlayerMovements(this.player_input_dic)

       
        
    }

   
    
};

var test_carte
var test_dirt_map

function getPlayerSpawnPoint(carte){

    spawn_point = {
        x : carte.getObjectLayer('entree').objects[0].x+carte.getObjectLayer('entree').objects[0].width/2,
        y : carte.getObjectLayer('entree').objects[0].y
    }

    return spawn_point

}