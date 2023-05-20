class surface extends Phaser.Scene {
    constructor() {

        super("surface");
    }
    init(data){

        console.log('initialisation scene Surface avec data :',data)

    }
    preload() {

        this.load.image("Tileset_Surface", "ressources/Tiled/tileset surface.png");
        this.load.tilemapTiledJSON("carte", "ressources/Tiled/Surface.json");
        this.load.image("temp bg", "ressources/Tiled/surface temp bg.png")
        this.load.image("porte", "ressources/assets/porte.png")
        this.load.image("tower",'ressources/assets/tour.png')
        this.load.spritesheet("archer", "ressources/assets/archer.png",
                { frameWidth: 50, frameHeight: 100 });
        this.load.spritesheet("ennemie", "ressources/assets/ennemie-Sheet.png",
                { frameWidth: 128, frameHeight: 64 });
        this.load.image("bow","ressources/assets/arc.png")

        this.load.spritesheet('perso','ressources/assets/perso.png',
                { frameWidth: 22, frameHeight: 28 });
        this.load.image("projectile", "ressources/assets/projectile.png")
        this.load.spritesheet('ammo_storage','ressources/assets/ammo_storage_sheet.png',
                {frameWidth:45,frameHeight:35});
        


        
        
    }
    create() {

        this.anims.create({
            key: 'inactive_archer',
            frames: [{key: 'archer', frame :0}],
            framerate: 20
    
        })
        this.anims.create({
            key: 'active_archer',
            frames: [{key: 'archer', frame :1}],
            framerate: 20
        })

        //ammo storage anims
        this.anims.create({
            key: '0_ammo',
            frames: [{key: 'ammo_storage', frame :0}],
            framerate: 20
        })
        this.anims.create({
            key: '1_ammo',
            frames: [{key: 'ammo_storage', frame :1}],
            framerate: 20
        })
        this.anims.create({
            key: '2_ammo',
            frames: [{key: 'ammo_storage', frame :2}],
            framerate: 20
        })
        this.anims.create({
            key: '3_ammo',
            frames: [{key: 'ammo_storage', frame :3}],
            framerate: 20
        })
        this.anims.create({
            key: '4_ammo',
            frames: [{key: 'ammo_storage', frame :4}],
            framerate: 20
        })
        this.anims.create({
            key: '5_ammo',
            frames: [{key: 'ammo_storage', frame :5}],
            framerate: 20
        })
        this.anims.create({
            key: '6_ammo',
            frames: [{key: 'ammo_storage', frame :6}],
            framerate: 20
        })


        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});

        this.background = this.add.image(WORLD_DIMENSION.width/2,WORLD_DIMENSION.height/2,'temp bg');
        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "tileset surface",
            "Tileset_Surface"
        );
        this.calque_sol = carteDuNiveau.createLayer("sol",tileset);
        
        this.calque_sol.setCollisionByProperty({estSolide : true})

        //creation de l'event resume qui permet de lire les data qui son transmise quand la scene est resume
        //Ai essayer de le faire marcher avec les event mais je n'y arrive pas
        //donc on passe par des références !
        //this.events.on('resume',SceneJustResumed)
        this.underground_01_ref = null
        //sera actualiser quand la scene sera initialisé !

        prop_phys_group = this.physics.add.group({allowGravity : false})
        

        
        this.porte = this.physics.add.group({allowGravity : false})

        carteDuNiveau.getObjectLayer('porte').objects.forEach((porte) => {
    
            //console.log(porte)
            this.porte_to_underground = new Porte(porte.x,porte.y-64,'porte',this.porte)
        });

        
        this.underground_was_generated = false
         

        
        carteDuNiveau.getObjectLayer('spawn_point').objects.forEach((spawn) => {
    
            this.player = new Player('perso',spawn.x,spawn.y,this,this.calque_sol);
        });

        this.structure = this.physics.add.group({allowGravity : true})
        this.ennemie_phy = this.physics.add.group({allowGravity : true})
        

        this.projectile_physic_group = this.physics.add.group({allowGravity : false})
        this.towers = new TowerManager(this.projectile_physic_group)

        carteDuNiveau.getObjectLayer('tour').objects.forEach((tower_from_tilled,i) => {
    
            this.towers.addNewTower(tower_from_tilled,this.structure,this)
            this.towers.tower_list[i].Build_Tower();

            this.towers.tower_list[i].SpawnArcher();
            this.physics.add.collider(this.structure,this.towers.tower_list[i].hitbox)
            this.physics.add.overlap(this.ennemie_phy,this.towers.tower_list[i].hitbox,EnnemieHitTower,null,this)
            this.physics.add.overlap(this.player.player_sprite,this.towers.tower_list[i].hitbox,PlayerAboveTower,null,this)
        });

        this.ennemie_list = [];

        
        
        //this.player = new Player('perso',100,100,this,this.calque_sol);


        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(this.player.player_sprite,this.calque_sol);
        this.physics.add.collider(this.structure,this.calque_sol);

        
        
        //this.physics.add.collider(this.player.player_sprite,this.test);



        //Gestion Camera
        this.cameras.main.startFollow(this.player.player_sprite,false,0.2,0.2,0,CAMERA_OFFSET); 
        this.cameras.main.zoom = 1;

        this.physics.world.setBounds(0, 0, WORLD_DIMENSION.width,WORLD_DIMENSION.height);
        //  ajout du champs de la caméra de taille identique à celle du monde
        this.cameras.main.setBounds(0, 0, WORLD_DIMENSION.width, WORLD_DIMENSION.height);

        //console.log(this.player.player_sprite)
        //console.log(this.porte_to_underground.sprite)


        this.physics.add.overlap(this.player.player_sprite,this.porte_to_underground.sprite,PlayerOverlapsUndergroundDoor,null,this);


        this.player.player_sprite.setCollideWorldBounds() 

        

        this.physics.add.collider(this.ennemie_phy,this.calque_sol);
        this.physics.add.collider(this.ennemie_phy,this.ennemie_phy);

        this.towers.tower_list.forEach((tower,i) => {
            this.physics.add.collider(this.ennemie_phy,tower.hitbox);
        });

        
        this.physics.add.overlap(this.ennemie_phy,this.projectile_physic_group, EnnemieWasHit,null,this)
        


        this.EnnemieManager = new EnnemieManager(this,this.ennemie_phy)

        ennemie_ref = this.EnnemieManager
        tower_ref = this.tower
        scene_ref = this


    }

    update() { 



        this.graphics.clear();
        
        this.towers.tower_list.forEach((tower,i) => {

            if(ennemie_number==0){

                tower.active = false
    
            if(Phaser.Math.Distance.Between(tower.x,tower.y,this.player.x,this.player.y)<=tower.range){
                //console.log('inside')
                this.graphics.lineStyle(2,0x00ff00);
                //tower.active = true
            }else{
                //console.log('outside',Phaser.Math.Distance.Between(tower.x,tower.y,this.player.x,this.player.y));
                this.graphics.lineStyle(2,0x0000ff);
                //tower.active = false
            }

            }else{

                this.graphics.lineStyle(2,0x0000ff);
                tower.active = false
                this.EnnemieManager.list_of_ennemies.forEach((ennemie) => {
                    
                    if(Phaser.Math.Distance.Between(tower.x,tower.y,ennemie.x,ennemie.y)<=tower.range){

                        

                        //new target picked up but not taking account of the Y value of the ennemie because if ennemies stack it should target the closest one to x i case ennemies stack
                        if(Phaser.Math.Distance.Between(tower.x,tower.y,ennemie.x,tower.y)<=Phaser.Math.Distance.Between(tower.towerTarget_x,tower.y,tower.x,tower.y)){
                            tower.towerTarget_x = ennemie.x
                            tower.towerTarget_y = ennemie.y
                        }
                        
                        tower.active = true

                        console.log('tower ',i,' actif\t tower status : ',tower.active)
                        //console.log('inside')
                        this.graphics.lineStyle(2,0x00ff00);
                    }

                })
                
            }
    
            
    
            this.graphics.strokeCircleShape(tower.hitbox_range).setDepth(5);
    
            tower.archer.UpdateArcherPos()
        });

        

        this.player_input_dic = UpdatePlayerInput(this.cursors)

        this.player.UpdatePlayerMovements(this.player_input_dic)

        test_player = this.player
        test_porte = this.porte_to_underground

       
        
        if(this.cursors.shift.isDown && underground_door_overlapp){

            
                if(this.underground_01_ref != null ){
                    Generic_TransferDataToResumedScene(this,this.underground_01_ref)
                    this.underground_01_ref.player.ammo = this.player.ammo
                }
                this.underground_was_generated = true
                this.scene.run('underground_level_01',this)
                this.scene.sleep()
            
            
        }

        underground_door_overlapp = false

        this.EnnemieManager.UpdateBehaviour();

        this.towers.UpdateTowers()

        
        
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
var tower_ref
var ennemie_ref

var test_var
var scene_ref
var ennemie_number = 0

var CAMERA_OFFSET = 400

var WORLD_DIMENSION = {
    width : 3200,
    height : 766
}

function PlayerOverlapsUndergroundDoor(scene){

    underground_door_overlapp = true

    

}
var prop_phys_group



function EnnemieWasHit(ennemie,projectile){


    console.log(projectile)
    ennemie.ennemie_ref.wasHit(projectile.bullet_ref.damage)
    projectile.bullet_ref.kill()

}

function EnnemieHitTower(tower,ennemie){



    ennemie.ennemie_ref.active = true
    ennemie.ennemie_ref.target = tower.tower_ref

}

function PlayerAboveTower(player,tower){

    //console.log('above !')
    if(player.player_ref.scene.cursors.shift.isDown){
        tower.tower_ref.reFillAmmo(this.player)
    }

}


// A appelé quand on resume une scene deja genéré
function Generic_TransferDataToResumedScene(current_scene,ref_to_resumed_scene){

    console.log('yo on reprend la scene',ref_to_resumed_scene.scene.key," depuis la scene ",current_scene.scene.key)
    
    
    //TODO : changement des données, HP, ammo, etc ....

}