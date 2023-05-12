class Ennemie {
    constructor(given_x,given_y,scene,physics_group){

        this.x = given_x
        this.y = given_y
        this.physics_group = physics_group
        this.scene = scene

        this.sprite = this.physics_group.create(this.x,this.y,'ennemie')
        ennemie_number = ennemie_number+1

    }

    

}