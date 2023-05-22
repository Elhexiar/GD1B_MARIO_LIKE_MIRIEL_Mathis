
class underground_level_01 extends Phaser.Scene {
    constructor(config) {

        super("underground_level_01");
    }
    init(data){

        console.log('initialisation scene underground_level_01 avec data :',data)
        this.surface_ref = data
        this.surface_ref.underground_01_ref = this

    }
    preload() {

        this.load.tilemapTiledJSON("underground_map_json", "ressources/Tiled/underground_level_01.json");
        this.load.image("Underground_Tileset_Image", "ressources/Tiled/underground tileset.png");
        for(var i = 0; i < 16 ; i++){
            this.load.image('blob '+i,'ressources/assets/dirt/dirt'+i+'.png');
        }
        this.load.spritesheet('Damage_Sprite','ressources/assets/damage_spriteSheet.png',
        {      frameWidth: 64, frameHeight: 64          });
        
        
    }
    create() {

        this.anims.create({
            key: '3HP',
            frames: [{key: 'Damage_Sprite', frame :0}],
            framerate: 20
    
        })
        this.anims.create({
            key: '2HP',
            frames: [{key: 'Damage_Sprite', frame :1}],
            framerate: 20
    
        })
        this.anims.create({
            key: '1HP',
            frames: [{key: 'Damage_Sprite', frame :2}],
            framerate: 20
    
        })

        const carteTilled_Underground = this.add.tilemap("underground_map_json");
        const tileset = carteTilled_Underground.addTilesetImage(
            "underground tuile",
            "Underground_Tileset_Image"
        );


        
        //console.log(carteTilled_Underground);
        
        this.calque_fond = carteTilled_Underground.createLayer("fond",tileset)
        //this.calque_dirt = carteTilled_Underground.createLayer("dirt",tileset)
        this.calque_mur = carteTilled_Underground.createLayer("mur",tileset);


        this.porte = this.physics.add.group({allowGravity : false})

        this.porte_overworld =  []
        carteTilled_Underground.getObjectLayer('sortie').objects.forEach((porte,i) => {
    
            //console.log(porte)
            this.porte_overworld[i] = new Porte(porte.x,porte.y,'porte',this.porte)
        });

        
        
        

        test_carte = carteTilled_Underground

        

        this.player_spawn_point = getPlayerSpawnPoint(carteTilled_Underground)
        //console.log(this.player_spawn_point)
        this.player = new Player('perso',this.player_spawn_point.x,this.player_spawn_point.y,this)

        //console.log(this.player)
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

                //console.log('x :',x,'|y :',y)

                carteTilled_Underground.layers.forEach((layer,index) => {
                    
                    if(layer.name == 'dirt'){
                        //console.log(layer)
                        if(layer.data[y][x].properties.cell_type == 'dirt'){
                            this.dirt_map.Change_cell(x,y,'dirt');
                            //console.log('xd')
                        }
                    }                        
            
                });

            }
        }
        for(let y = 0; y < 32; y++){
            
            for(let x = 0 ; x < 48 ; x++){

                if(this.dirt_map.Get_specific_cell_type_name(x,y) == 'dirt'){

                    this.sprite_to_use = Adapt_sprite(x,y,this.dirt_map.map_layers);
                    //console.log(this.sprite_to_use,'in x: ',x,'|y :',y);
                    this.dirt_map.map_layers[y][x].cell_sprite =  this.dirt_blocs.create(x*64+32,y*64+32,this.sprite_to_use).setImmovable(true);
                    

                }

            }

        }

        this.physics.add.collider(this.player.player_sprite,this.dirt_blocs);

        this.input.on('pointerdown', function PointerDown(pointer){

            //console.log("raw  = x :",pointer.x,"|y :",pointer.y);
            

            pointer_info.clicked = true
            

            

        });
        this.input.on('pointermove', function PointerDown(pointer){

            pointer_info.screen_x = pointer.x
            pointer_info.screen_y = pointer.y
            //console.log("raw  = x :",pointer.x,"|y :",pointer.y);

            

        });

        this.input.mouse.disableContextMenu();

        this.input.on('pointerup', pointer =>
        {

            if (pointer.leftButtonReleased())
            {
                console.log('Left Button was released');
                pointer_info.clicked = false
            }
            else if (pointer.rightButtonReleased())
            {
                console.log('Right Button was released');
                pointer_info.clicked = false
            }
            else if (pointer.middleButtonReleased())
            {
                console.log('Middle Button was released');
            }
            else if (pointer.backButtonReleased())
            {
                console.log('Back Button was released');
            }
            else if (pointer.forwardButtonReleased())
            {
                console.log('Forward Button was released');
            }

        });
        
        this.porte_overworld.forEach((porte) => {
            
            this.physics.add.overlap(this.player.player_sprite,porte.sprite,PlayerOverlapsOverworldDoor,null,this);

        });

        

        

        this.active = true

        test_dirt_map = this.dirt_map

        this.UI_ref = this.surface_ref.UI_ref
        console.log(this.surface_ref)
        this.UI_ref.underground_ref = this
    }

    update() { 

        if(boolean_test == true){
            console.log(this)
            boolean_test = false
        }

        this.player_input_dic = UpdatePlayerInput(this.cursors)

        this.player.UpdatePlayerMovements(this.player_input_dic)

        if(pointer_info.clicked == true){
            
            this.pointer_coord_x = pointer_info.screen_x + this.player.x - 800
            this.pointer_coord_y = pointer_info.screen_y + this.player.y - 450

            //console.log("player  x :",this.player.x,"|y :",this.player.y)
            //console.log("adjusted = x :",this.pointer_coord_x,"|y :",this.pointer_coord_y);

            this.pointer_coord_x = (this.pointer_coord_x - this.pointer_coord_x%64)/64
            this.pointer_coord_y = (this.pointer_coord_y - this.pointer_coord_y%64)/64

            //console.log("calc = x :",this.pointer_coord_x,"|y :",this.pointer_coord_y);
            if(this.pointer_coord_x>=0 && this.pointer_coord_x <= 48 && this.pointer_coord_y >= 0 && this.pointer_coord_y <= 32){
                this.dirt_map.map_layers[this.pointer_coord_y][this.pointer_coord_x].was_hit(this.player)
            }

            
            //Destroy_selected_cell(this.pointer_coord_x,this.pointer_coord_y,this.dirt_map,this.dirt_blocs)
        }
        //if(this.pointer)

       updatePlayerInfo(this.player)
        //pointer_info.clicked = false
        if(this.cursors.shift.isDown && overworld_door_overlapp){
            Generic_TransferDataToResumedScene(this,this.surface_ref)
            this.scene.resume('surface','yo nouvelle scene')
            this.player.player_sprite.x = this.player_spawn_point.x
            this.player.player_sprite.y = this.player_spawn_point.y

            this.surface_ref.player.ammo = this.player.ammo
            this.surface_ref.able_to_descend = true
            this.surface_ref.player.able_to_move = true
            this.surface_ref.player.Teleport_To_Spawn()
            this.UI_ref.player_above = true
            this.scene.sleep()
            
        }
        overworld_door_overlapp = false

        
    }

   
    
};

var boolean_test = false

var test_carte
var test_dirt_map
var pointer_info = {
    clicked : false,
    screen_x : 0,
    screen_y : 0
}

var pointer_ref

function updatePlayerInfo(player){



}

function getPlayerSpawnPoint(carte){

    spawn_point = {
        x : carte.getObjectLayer('entree').objects[0].x+carte.getObjectLayer('entree').objects[0].width/2,
        y : carte.getObjectLayer('entree').objects[0].y+carte.getObjectLayer('entree').objects[0].height/2,
    }

    return spawn_point

}

var overworld_door_overlapp = false

function PlayerOverlapsOverworldDoor(player,door){

    overworld_door_overlapp = true



}


