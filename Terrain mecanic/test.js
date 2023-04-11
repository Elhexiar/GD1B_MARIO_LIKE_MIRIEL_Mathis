var test_list = [];
var test_list_objects = [];
var gid_list =[159,160,161,162,209,210,211,212,259,260,261,262,309,310,311,312]
var corresponding_sprites=['blob 0','blob 1','blob 2','blob 3','blob 4','blob 5','blob 6',
'blob 7','blob 8','blob 9','blob 10','blob 11','blob 12','blob 13','blob 14','blob 15']
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
        
    }
    create() {

        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage(
            "temp tileset",
            "Phaser_tileset"
        );
        const calque_sol = carteDuNiveau.createLayer("sol",tileset);
        const calque_mur = carteDuNiveau.createLayer("mur",tileset);
        const calque_pits = carteDuNiveau.createLayer('sur sol',tileset);

        test_carte = carteDuNiveau;

        this.blocs = this.physics.add.group();

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
        
    }

    update() { 
        
    }

   
    
};

