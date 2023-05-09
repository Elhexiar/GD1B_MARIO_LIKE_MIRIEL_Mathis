class Player {

    constructor(physics_group,spriteSheet){
        this.HP = 3

        // Player speed
        this.speed = 600;


        //states
        this.state = 'idle';
        this.walk = false;
        this.jump = false;
        this.attack = false;
        this.falling = false;
        
        //generation du sprite du joueur
        this.player_sprite = GeneratePlayerSprite(physics_group,spriteSheet);
    }

    //methode
    UpdateState(ObjectInput){

        //possibilité de redondance
        if(this.jump ==false){
            this.falling = false
        }
        
        if(this.walk == true && this.jump == false){
            this.state = 'walking';
        }
        if(this.walk == true && this.jump == true && this.falling == false){
            this.state = 'jump straffing up'
        }
        if(this.walk == true && this.jump == true && this.falling == false){
            
        }


    }



}

function GeneratePlayerSprite(physics_group,spriteSheet){



}

