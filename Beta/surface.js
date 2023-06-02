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
                { frameWidth: 64, frameHeight: 32 });
        this.load.image("bow","ressources/assets/arc.png")

        this.load.spritesheet('perso','ressources/assets/personnage_spritesheet.png',
                { frameWidth: 28, frameHeight: 46 });
        this.load.image("projectile", "ressources/assets/projectile.png")
        this.load.spritesheet('ammo_storage','ressources/assets/ammo_storage_sheet.png',
                {frameWidth:45,frameHeight:35});
        this.load.spritesheet('Shortcut','ressources/assets/Shortcut_sheet.png',
                {frameWidth:128,frameHeight:64});
        
        
        
        this.load.audio('theme', 'ressources/music/theme.mp3');

        this.load.spritesheet('reload widget','ressources/assets/UI/reload widget.png',{frameWidth:64,frameHeight:64});
        this.load.spritesheet('upgrade widget','ressources/assets/UI/upgrade widget.png',{frameWidth:64,frameHeight:64});
        this.load.spritesheet('repair widget','ressources/assets/UI/repair widget.png',{frameWidth:64,frameHeight:64});
        this.load.spritesheet('blank widget', 'ressources/assets/UI/blank widget.png',{frameWidth:64,frameHeight:64});

        this.load.spritesheet('blank_bg_widget','ressources/assets/UI/blank_bg_widget.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('cross_widget','ressources/assets/UI/cross_widget.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('tower_widget','ressources/assets/UI/tower_widget.png',{frameWidth:64,frameHeight:64})
        this.load.spritesheet('barricade_widget','ressources/assets/UI/barricade_widget.png',{frameWidth:64,frameHeight:64})

        this.load.spritesheet('barricade','ressources/assets/barricade.png',{frameWidth:64,frameHeight:64})
        //this.load.spritesheet()

        
        
    }
    create() {

        this.anims.create({
            key : 'shortcut available',
            frames: [{key: 'Shortcut', frame :1}],
            framerate: 1,
            repeat: -1
        })


        this.anims.create({
            key : 'ennemie walk',
            frames: this.anims.generateFrameNumbers('ennemie', {start:11,end:22}),
            framerate: 1,
            repeat: -1
        })
        this.anims.create({
            key : 'ennemie attack',
            frames: this.anims.generateFrameNumbers('ennemie', {start:0,end:10}),
            framerate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'player idle',
            frames: [{key: 'perso', frame :0}],
            framerate: 20
        })
        this.anims.create({
            key: 'player walking',
            frames: this.anims.generateFrameNumbers('perso', {start:1,end:7}),
            frameRate: 10,
            repeat: -1
        });

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

        this.theme_config = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            }

        //-------------------------------------------------------------------------------------------------
        // création des variables booléenne et diverse
        //-------------------------------------------------------------------------------------------------
        this.build_tower_selected = false
        this.build_barricade_selected = false
        this.ennemie_list = [];

        this.curseur_overlay = 'none'

        this.construction_wheel = null
        this.underground_was_generated = false
        this.UI_ref = null

        this.able_to_descend = true
        //creation de l'event resume qui permet de lire les data qui son transmise quand la scene est resume
        //Ai essayer de le faire marcher avec les event mais je n'y arrive pas
        //donc on passe par des références !
        //this.events.on('resume',SceneJustResumed)
        this.underground_01_ref = null
        //sera actualiser quand la scene sera initialisé !

        
        this.theme = this.sound.add('theme',this.theme_config)
        
            this.theme.play()
            


        this.graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00ff00 }, fillStyle: { color: 0xff0000 }});

        this.background = this.add.image(WORLD_DIMENSION.width/2,WORLD_DIMENSION.height/2,'temp bg');
        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "tileset surface",
            "Tileset_Surface"
        );
        this.calque_sol = carteDuNiveau.createLayer("sol",tileset);
        
        this.calque_sol.setCollisionByProperty({estSolide : true})

        

        prop_phys_group = this.physics.add.group({allowGravity : false})
        

        
        this.porte = this.physics.add.group({allowGravity : false})

        carteDuNiveau.getObjectLayer('porte').objects.forEach((porte) => {
    
            //console.log(porte)
            this.porte_to_underground = new Porte(porte.x,porte.y-64,'porte',this.porte)
            this.porte_to_underground.sprite.scene_ref = this
            this.porte_to_underground.sprite.setInteractive()
            this.porte_to_underground.sprite.on('pointerdown', function() {
                this.GoUnderground()
             }, this);
        });

        this.left_shortcut = new Shortcut(1450,675,1,this)
        this.right_shortcut = new Shortcut(5000,675,2,this)

        
        
         

        
        carteDuNiveau.getObjectLayer('spawn_point').objects.forEach((spawn) => {
    
            this.player = new Player('perso',spawn.x,spawn.y,this,this.calque_sol);
        });

        this.structure = this.physics.add.group({allowGravity : true})
        this.ennemie_phy = this.physics.add.group({allowGravity : true})
        this.barricade = this.physics.add.group({allowGravity : true})
        

        this.projectile_physic_group = this.physics.add.group({allowGravity : false})
        this.towers = new TowerManager(this.projectile_physic_group,this)

        carteDuNiveau.getObjectLayer('tour').objects.forEach((tower_from_tilled,i) => {
    
            this.towers.addNewTowerFromTilled(tower_from_tilled,this.structure,this)
            
        });

        

        

        
        
        //this.player = new Player('perso',100,100,this,this.calque_sol);


        this.cursors = this.input.keyboard.createCursorKeys();
        this.enter_key = this.input.keyboard.addKey('ENTER');
        this.ctrl_key = this.input.keyboard.addKey('CTRL');

        this.physics.add.collider(this.player.player_sprite,this.calque_sol);
        this.physics.add.collider(this.structure,this.calque_sol);
        this.physics.add.collider(this.barricade,this.calque_sol);


        
        
        //this.physics.add.collider(this.player.player_sprite,this.test);



        //Gestion Camera
        this.cameras.main.startFollow(this.player.player_sprite,false,0.2,0.2,0,CAMERA_OFFSET); 
        this.cameras.main.zoom = 1;

        this.physics.world.setBounds(0, 0, WORLD_DIMENSION.width,WORLD_DIMENSION.height);
        //  ajout du champs de la caméra de taille identique à celle du monde
        //this.cameras.main.setBounds(0, 0, WORLD_DIMENSION.width, WORLD_DIMENSION.height);

        //console.log(this.player.player_sprite)
        //console.log(this.porte_to_underground.sprite)


        this.physics.add.overlap(this.player.player_sprite,this.porte_to_underground.sprite,PlayerOverlapsUndergroundDoor,null,this);


        this.player.player_sprite.setCollideWorldBounds() 

        

        this.physics.add.collider(this.ennemie_phy,this.calque_sol);
        this.physics.add.collider(this.ennemie_phy,this.calque_sol);
        this.physics.add.collider(this.ennemie_phy,this.barricade);

        //this.physics.add.overlap(this.barricade,this.ennemie_phy,EnnemieHitsBarricade,null,this)
        //this.physics.add.collider(this.ennemie_phy,this.ennemie_phy);



        
        this.physics.add.overlap(this.ennemie_phy,this.projectile_physic_group, EnnemieWasHit,null,this)

        //this.cursor_overlay = new CursorOverlay(pointer_info)
        


        this.EnnemieManager = new EnnemieManager(this,this.ennemie_phy)

        ennemie_ref = this.EnnemieManager
        tower_ref = this.tower
        scene_ref = this

        
        this.scene.run('UI_Scene',{scene:this,carte:carteDuNiveau})

        


    
        this.input.on('pointerdown', function PointerDown(pointer){

            //console.log("raw  = x :",pointer.x,"|y :",pointer.y);
            

            if(pointer.leftButtonDown()){
                pointer_info.clicked = true
                console.log('left')
            }
            if(pointer.rightButtonDown()){
                pointer_info.right_clicked = true
                console.log('right')
                if(scene_ref.construction_wheel == null){
                    Build_construction_wheel(scene_ref)
                }else{
                    scene_ref.construction_wheel.kill_wheel()
                }
                
            }
            
            

            

        });
        this.input.on('pointermove', function PointerDown(pointer){

            pointer_info.screen_x = pointer.x
            pointer_info.screen_y = pointer.y
            //console.log("raw  = x :",pointer.x,"|y :",pointer.y);

            

        });

        this.input.mouse.disableContextMenu();
        console.log(this.input.mouse)

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
                pointer_info.right_clicked = false
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

        //new Tower_Menu()

        


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
                        // if(tower.x < 3000){
                            // console.log(tower.towerTarget_x)
                            // console.log(Phaser.Math.Distance.Between(tower.x,tower.y,ennemie.x,tower.y), '//',Phaser.Math.Distance.Between(tower.towerTarget_x,tower.y,tower.x,tower.y))
                            if(Phaser.Math.Distance.Between(tower.x,tower.y,ennemie.x,tower.y)<=Phaser.Math.Distance.Between(tower.towerTarget_x,tower.y,tower.x,tower.y)){
                                tower.towerTarget_x = ennemie.x
                                tower.towerTarget_y = ennemie.y
                            }

                        // }
                        // if(tower.x > 3000){
                        //     if(Phaser.Math.Distance.Between(tower.x,tower.y,ennemie.x,tower.y)<=Phaser.Math.Distance.Between(tower.towerTarget_x,tower.y,tower.x,tower.y)){
                        //         tower.towerTarget_x = ennemie.x
                        //         tower.towerTarget_y = ennemie.y
                        //     }

                        // }

                        
                        
                        tower.active = true

                        //console.log('tower ',i,' actif\t tower status : ',tower.active)
                        //console.log('inside')
                        this.graphics.lineStyle(2,0x00ff00);
                    }

                })
                
            }
    
            
    
            //this.graphics.strokeCircleShape(tower.hitbox_range).setDepth(5);
    
            tower.archer.UpdateArcherPos()
        });

        

        this.player_input_dic = UpdatePlayerInput(this.cursors)

        this.player.UpdatePlayerMovements(this.player_input_dic)

        test_player = this.player
        test_porte = this.porte_to_underground

       
        
        if(this.cursors.shift.isDown && underground_door_overlapp && this.able_to_descend == true){

            this.GoUnderground()
            
        }

        if(pointer_info.clicked == true && this.UI_ref.player_above == true){
            pointer_info.clicked = false

            if(this.build_tower_selected == true){

                if(this.player.ammo >= 90){
                    this.player.ammo -= 90
                    this.towers.BuildNewTower({x:pointer_info.screen_x + this.player.x - 800 ,y:pointer_info.screen_y+this.player.y -650})

                }
                
                //
                

            }
            this.build_tower_selected = false
            if(this.build_barricade_selected == true){

                if(this.player.ammo >= 20){
                    this.player.ammo -= 20
                    new barricade(pointer_info.screen_x + this.player.x - 800 ,pointer_info.screen_y+this.player.y -650,this,this.barricade)

                }
                
                //
                

            }
            this.build_barricade_selected = false
        }

        underground_door_overlapp = false

        this.EnnemieManager.UpdateBehaviour();

        this.towers.UpdateTowers()

        
        
    }
    
    GoUnderground(){
        if(this.underground_01_ref != null ){
            Generic_TransferDataToResumedScene(this,this.underground_01_ref)
            console.log(this.underground_01_ref)
            this.underground_01_ref.player.ammo = this.player.ammo
        }
        this.underground_was_generated = true
        this.scene.run('underground_level_01',this)
        this.player.location = 'underground_01'
        this.player.player_sprite.setVelocityX(0)
        this.player.player_sprite.setVelocityY(0)
        this.able_to_descend = false
        this.player.able_to_move = false
        this.UI_ref.player_above =false
        this.porte_to_underground.sprite.disableInteractive()
        

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

var CAMERA_OFFSET = 200

var WORLD_DIMENSION = {
    width : 6400,
    height : 766
}

function PlayerOverlapsUndergroundDoor(scene){

    underground_door_overlapp = true

    

}
var prop_phys_group



function EnnemieWasHit(ennemie,projectile){


    //console.log(projectile)
    ennemie.ennemie_ref.wasHit(projectile.bullet_ref.damage)
    projectile.bullet_ref.kill()

}

function EnnemieHitStructure(structure,ennemie){

    //console.log(structure)

    ennemie.ennemie_ref.active = true
    ennemie.ennemie_ref.target = structure.structure_ref

}

function PlayerAboveTower(player,tower){

    //console.log('above !')
    if(player.player_ref.scene.cursors.shift.isDown){
        tower.tower_ref.reFillAmmo(player.player_ref)
        
    }
    if(player.player_ref.scene.enter_key.isDown){
        tower.tower_ref.repair(player.player_ref)
    }
    if(player.player_ref.scene.ctrl_key.isDown){
        tower.tower_ref.Upgrade(player.player_ref)
    }

    tower.structure_ref.show_menu = true

}


// A appelé quand on resume une scene deja genéré
function Generic_TransferDataToResumedScene(current_scene,ref_to_resumed_scene){

    console.log('yo on reprend la scene',ref_to_resumed_scene.scene.key," depuis la scene ",current_scene.scene.key)
    
    
    //TODO : changement des données, HP, ammo, etc ....

}

function Build_construction_wheel(scene){


    scene.construction_wheel = new construction_wheel(pointer_info.screen_x + scene.player.x - 800 ,pointer_info.screen_y+scene.player.y -650,scene)

}

function skipCurrentWaveTimer(){

    scene_ref.EnnemieManager.wave_timer.elapsed = scene_ref.EnnemieManager.wave_timer.delay -10

}



var pointer_info = {
    right_clicked: false ,
    clicked : false,
    screen_x : 0,
    screen_y : 0
}