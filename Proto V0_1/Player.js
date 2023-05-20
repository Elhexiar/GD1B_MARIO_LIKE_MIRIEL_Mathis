var player_config = {
    HP : 3,
    speed : 900,
    jumpForce : 400,
}

class Player {

    constructor(spriteSheet,x,y,scene){
        this.HP = player_config.HP

        this.scene = scene;

        this.spawnX = x
        this.spawnY = y

        this.x = x
        this.y = y

        // Player speed
        this.speed = player_config.speed;

        this.jumpForce = player_config.jumpForce;


        //states
        this.state = 'idle';
        this.walk = false;
        this.jump = false;
        this.attack = false;
        this.falling = false;

        this.onGround = true;
        this.ammo = 0
        this.carrying_capacity = 60
        
        //generation du sprite du joueur
        this.player_sprite = GeneratePlayerSprite(spriteSheet,this.scene,this);

        this.player_sprite.player_ref = this

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

    UpdatePlayerMovements(input){
        if (input.right == true)                           
                    {                                         
                        this.player_sprite.setVelocityX(this.speed);                                                 
                    } 
                else if (input.left == true)                           
                    {                                     
                        this.player_sprite.setVelocityX(-this.speed);                                                          
                    }                                                   
                else {
                    this.player_sprite.setVelocityX(0);
                }
                if (input.up == true && this.jump == false)                           
                    {                  
                        this.jump = true                     
                        this.player_sprite.setVelocityY(-this.jumpForce);                                               
                    }
                                                                   
                else if (input.down == true)                           
                    {                                      
                        this.player_sprite.setVelocityY(this.jumpForce);                                                            
                    } 

                if(this.player_sprite.body.blocked.down == true){
                    this.onGround = true
                    this.jump = false
                }else{
                    this.onGround = false
                }

                this.x = this.player_sprite.x
                this.y = this.player_sprite.y
    }



}

function GeneratePlayerSprite(spriteSheet,scene,player){

    
    return scene.physics.add.sprite(player.spawnX, player.spawnY, 'perso');


}

