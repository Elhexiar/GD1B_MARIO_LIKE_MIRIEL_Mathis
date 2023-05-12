class Tower_archer {

    constructor(tilled_object,given_physics,scene){

        this.tilled_ref = tilled_object
        this.x = tilled_object.x
        this.y = tilled_object.y
        this.sprite = 'none'
        this.physics_group = given_physics
        this.active = true
        this.reloading = false
        this.hitbox = 'none'
        this.scene = scene
        this.archer = 'none'
        this.range = 500

        //this.circle_hitbox_range_physics_group = this.scene.physics.add.group({allowGravity : false})
        this.hitbox_range = this.scene.add.circle(this.x,this.y,this.range)
        console.log('cercle :',this.hitbox_range)
        //this.scene.physics.add.existing(this.hitbox_range,true)


        console.log(this.circle)


    }

        //méthode

    Build_Tower(){

        this.sprite = this.physics_group.create(this.x,this.y,'tower')
        console.log(this.tilled_ref)
        this.hitbox = this.scene.add.rectangle(this.tilled_ref.x,this.tilled_ref.y+this.tilled_ref.height/2 , this.tilled_ref.width, this.tilled_ref.height);
        this.scene.physics.add.existing(this.hitbox,true)
        //console.log(this.hitbox)

    }

    SpawnArcher(){

        this.archer = new Archer(this.x,this.y-200,this.physics_group,this)

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