class TowerManager {

    constructor(projectile_physics_group){
    this.tower_list = []
    this.tower_number = 0
    this.projectile_physics_group = projectile_physics_group


    }

    addNewTower(tilled_object,given_physics,scene){

        this.tower_list.push(new Tower_archer(tilled_object,given_physics,scene,this.projectile_physics_group))

    }

    UpdateTowers(){
        this.tower_list.forEach(tower => {

            tower.Update_Tower_Behaviour()

            
            
        });
    }


}

class Tower_archer {

    constructor(tilled_object,given_physics,scene,projectile_group){

        this.tilled_ref = tilled_object
        this.x = tilled_object.x
        this.y = tilled_object.y
        this.sprite = 'none'
        this.physics_group = given_physics
        this.active = false
        this.reloading = false
        this.hitbox = 'none'
        this.scene = scene
        this.archer = 'none'
        this.range = 500
        this.projectile_physics_group = projectile_group
        this.justShot = false
        this.cooldown = 2000
        this.projectile_array = []

        this.towerTarget_x = 0
        this.towerTarget_y = 0

        //this.circle_hitbox_range_physics_group = this.scene.physics.add.group({allowGravity : false})
        this.hitbox_range = this.scene.add.circle(this.x,this.y,this.range)
        console.log('cercle :',this.hitbox_range)
        //this.scene.physics.add.existing(this.hitbox_range,true)


        console.log(this.circle)


    }

        //méthode

    Build_Tower(){

        this.sprite = this.physics_group.create(this.x,this.y,'tower').setImmovable(true)
        console.log(this.tilled_ref)
        this.hitbox = this.scene.add.rectangle(this.tilled_ref.x,this.tilled_ref.y+this.tilled_ref.height/2 , this.tilled_ref.width, this.tilled_ref.height);
        this.scene.physics.add.existing(this.hitbox,true)
        //console.log(this.hitbox)

    }

    SpawnArcher(){

        this.archer = new Archer(this.x,this.y-200,this.physics_group,this)

    }

    Update_Tower_Behaviour(){

        if(this.active == true){

            if(this.justShot == false){

                this.projectile_array.push(new projectile_archer(this.x,this.y,this.towerTarget_x,this.towerTarget_y,this.projectile_physics_group,this.scene))
                this.justShot = true
                console.log('piou')
                this.scene.time.delayedCall(this.cooldown,() => { this.justShot =  false },null,this)

            }

            //this.projectile_array.forEach(element => {
            //    this.scene.physics.add.collider(this.projectile)
            //});


            
            
        }



    }

    






    
}



class Archer {

    constructor(given_x,given_y,given_physics,tower){

        this.x = given_x
        this.y = given_y
        
        this.physics_group = given_physics
        this.sprite = this.physics_group.create(this.x,this.y,'archer')
        //this.bow = new Bow()
        this.target = 'none'
    }

    UpdateArcherPos(){
        this.x = this.sprite.x
        this.y = this.sprite.y
    }


}

class Bow {

    constructor(given_x,given_y,given_physics){

        this.x = given_x
        this.y = given_y
        this.sprite = 'none'
        this.physics_group = given_physics
        this.angle = 0

    }


}

class projectile_archer {

    constructor(given_x,given_y,target_x,target_y,physics_group,scene){

        this.x = given_x
        this.y = given_y
        this.speed = 800

        this.physics_group = physics_group

        this.sprite = this.physics_group.create(this.x,this.y,'projectile')
        this.target_vector = new Phaser.Math.Vector2(target_x-this.x,target_y-this.y)
        //console.log(this.target_vector)
        this.target_vector.normalize()

        this.sprite.body.setVelocityX(this.target_vector.x*this.speed)
        this.sprite.body.setVelocityY(this.target_vector.y*this.speed)


    }


}

function resetShot(){
    this.justShot = false
    console.log('reloaded',just_shot)
}