class EnnemieManager {

    constructor(scene,physics_group){

        this.number_of_ennemies = 0
        this.list_of_ennemies = []
        this.intensity = 0
        this.scene = scene
        this.physics_group = physics_group


    }

    spawnSingleEnnemie(x,y){

        this.index = this.list_of_ennemies.length
        this.list_of_ennemies.push(new Ennemie(x,y,this.scene,this.physics_group,this,this.index))

    }

    SpawnWave(){

    }

    UpdateBehaviour(){

        this.list_of_ennemies.forEach((ennemie,i) => {
            
            ennemie.UpdateBehaviour()
        });

    }



}



class Ennemie {
    constructor(given_x,given_y,scene,physics_group,manager,index){

        this.x = given_x
        this.y = given_y
        this.physics_group = physics_group
        this.scene = scene
        this.hp = 3
        this.manager_ref = manager
        this.index = index
        this.active = false
        this.target = 'none'
        this.damage = 1
        this.justAttacked = false
        this.cooldown = 1000

        this.speed = 200

        this.sprite = this.physics_group.create(this.x,this.y,'ennemie')
        this.sprite.ennemie_ref = this
        ennemie_number = ennemie_number+1

    }

    UpdateBehaviour(){


        this.sprite.setVelocityX(this.speed);
        this.x = this.sprite.x
        this.y = this.sprite.y

        if(this.active == true){

            //TODO animation d'attaque

            //faire des dégat a la tour
            if(this.justAttacked == false){

                this.justAttacked = true
                this.target.hp = this.target.hp -1
                if(this.target.hp <= 0){
                    this.target.kill()
                }
                
                console.log('ennemie n°',this.index,"attaque la tour, il lui reste :",this.target.hp,"HP")
                this.scene.time.delayedCall(this.cooldown,() => { this.justAttacked =  false },null,this)
            
            }
            
            

        }

    }

    wasHit(damage){

        console.log('pv :',this.hp)

        this.hp = this.hp - damage

        console.log('pv :',this.hp,'was hit for :',damage)

        if(this.hp <=0){
            this.sprite.destroy()
            delete this.manager_ref.list_of_ennemies[this.index]
            ennemie_number = ennemie_number -1
        }

    }

    

}

