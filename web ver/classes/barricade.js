class barricade {

    constructor(x,y,scene,physics_group){

        this.x = x
        this.y = 590
        this.hp = 20

        
        this.scene = scene
        this.physics = this.scene.physics.add.group();
        this.scene.physics.add.collider(this.physics,this.scene.calque_sol);
        this.scene.physics.add.collider(this.physics,this.scene.ennemie_phy,EnnemieHitStructure,null,this);

        this.sprite = this.physics.create(this.x,this.y,'barricade').setImmovable(true)
        
        this.sprite.structure_ref = this

    }

    kill(){

        this.sprite.destroy()



    }

}