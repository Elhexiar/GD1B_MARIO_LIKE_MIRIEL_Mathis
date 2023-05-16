class EnnemieManager {

    constructor(scene,physics_group){

        this.number_of_ennemies = 0
        this.list_of_ennemies = []
        this.intensity = 0
        this.scene = scene
        this.physics_group = physics_group


    }

    spawnSingleEnnemie(x,y){

        this.list_of_ennemies.push(new Ennemie(x,y,this.scene,this.physics_group))

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
    constructor(given_x,given_y,scene,physics_group){

        this.x = given_x
        this.y = given_y
        this.physics_group = physics_group
        this.scene = scene

        this.speed = 200

        this.sprite = this.physics_group.create(this.x,this.y,'ennemie')
        ennemie_number = ennemie_number+1

    }

    UpdateBehaviour(){


        this.sprite.setVelocityX(this.speed);
        this.x = this.sprite.x
        this.y = this.sprite.y

    }

    

}

