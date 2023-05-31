class barricade {

    constructor(x,y,scene,physics_group){

        this.x = x
        this.y = 590

        this.physics = physics_group
        this.scene = scene

        this.sprite = this.physics.create(this.x,this.y,'barricade').setImmovable(true)

    }

}