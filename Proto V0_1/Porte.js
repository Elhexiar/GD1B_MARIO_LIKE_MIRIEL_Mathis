class Porte {

    constructor(x,y,sprite,physics_group){

        this.x = x
        this.y = y
        this.physics = physics_group

        console.log(this.physics)
        
        this.sprite = this.physics.create(this.x,this.y,sprite).setOrigin(0)
        console.log(this.sprite)
        console.log("x :",this.x,"|y :",this.y)

    }


    //méthode




}