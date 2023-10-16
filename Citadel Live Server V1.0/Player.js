var player_config = {
    HP : 3,
    speed : 450,
    jumpForce : 800,
}

class Player {

    constructor(spriteSheet,x,y,scene){
        this.HP = player_config.HP

        this.scene = scene;

        this.spawnX = x
        this.spawnY = y

        this.x = x
        this.y = y

        this.location = 'surface'

        // Player speed
        this.speed = player_config.speed;
        this.range = 150

        this.jumpForce = player_config.jumpForce;
        this.able_to_move = true


        //states
        this.state = 'idle';
        this.walk = false;
        this.jump = false;
        this.attack = false;
        this.falling = false;

        this.onGround = true;
        this.ammo = 0
        this.carrying_capacity = 800
        
        //generation du sprite du joueur
        this.player_sprite = GeneratePlayerSprite(spriteSheet,this.scene,this).setScale(2,2);
        this.player_sprite.body.setMaxVelocityY(950)

        this.player_sprite.player_ref = this

    }

    //methode
    UpdateState(){

        //possibilité de redondance
        if(this.jump ==false){
            this.falling = false
        }
        
        if(this.walk == true && this.jump == false){

            if(this.state != 'walking'){
                this.player_sprite.anims.play('player walking')
            }
            this.state = 'walking';
            
        }
        if(this.walk == true && this.jump == true && this.falling == false){
            
            if(this.state != 'walking'){
                this.player_sprite.anims.play('player walking')
            }
            this.state = 'walking'
        }

        if(this.walk == false){

            
            
            if(this.state != 'idle'){
                this.player_sprite.anims.play('player idle')
            }
            
            this.state = 'idle'

        }

        if(this.walk == true && this.jump == true && this.falling == false){
            
        }


    }

    Teleport_To_Spawn(){
        this.x = this.spawnX
        this.y = this.spawnY
        this.player_sprite.x = this.x
        this.player_sprite.y = this.y
        this.player_sprite.setVelocityX(0)
        this.player_sprite.setVelocityY(0)
        
    }

    Teleport_To_Pos_1(){
        this.x = 1220
        this.y = 600
        this.player_sprite.x = this.x
        this.player_sprite.y = this.y
        this.player_sprite.setVelocityX(0)
        this.player_sprite.setVelocityY(0)

    }
    Teleport_To_Pos_2(){
        this.x = 5000
        this.y = 600
        this.player_sprite.x = this.x
        this.player_sprite.y = this.y
        this.player_sprite.setVelocityX(0)
        this.player_sprite.setVelocityY(0)

    }

    UpdatePlayerMovements(input){
        if(this.able_to_move){
            this.walk = false
        if (input.right == true)                           
                    {  
                        this.player_sprite.setFlipX(0)                                       
                        this.player_sprite.setVelocityX(this.speed);
                        this.walk = true                                                 
                    } 
                else if (input.left == true)                           
                    {       
                        this.player_sprite.setFlipX(1)                                
                        this.player_sprite.setVelocityX(-this.speed); 
                        this.walk = true                                                         
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

                this.UpdateState()
            }
    }



}

function GeneratePlayerSprite(spriteSheet,scene,player){

    
    return scene.physics.add.sprite(player.spawnX, player.spawnY, 'perso').setDepth(3);


}

