class Player {

    constructor(spriteSheet,x,y,scene){
        this.HP = 3

        this.scene = scene;

        this.spawnX = x
        this.spawnY = y

        this.x = x
        this.y = y

        // Player speed
        this.speed = 320;

        this.jumpForce = 800;


        //states
        this.state = 'idle';
        this.walk = false;
        this.jump = false;
        this.attack = false;
        this.falling = false;

        this.onGround = true;
        
        //generation du sprite du joueur
        this.player_sprite = GeneratePlayerSprite(spriteSheet,this.scene);


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
    }



}

function GeneratePlayerSprite(spriteSheet,scene){

    
    return scene.physics.add.sprite(100, 100, 'perso');


}

