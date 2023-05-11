class Tower_archer {

    constructor(given_x,given_y,given_physics){

        this.x = given_x
        this.y = given_y
        this.sprite = 'none'
        this.physics_group = given_physics
        this.active = false
        this.reloading = false


    }

    //méthode


    
}



class Archer {

    constructor(given_x,given_y,given_physics){

        this.x = given_x
        this.y = given_y
        this.sprite = 'none'
        this.physics_group = given_physics
        //this.bow = new Bow()
        this.target = 'none'
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