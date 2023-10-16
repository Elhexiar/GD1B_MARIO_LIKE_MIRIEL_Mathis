class Porte {

    constructor(x,y,sprite,physics_group,direction){

        this.x = x
        this.y = y
        this.physics = physics_group
        this.direction = direction

        //console.log(this.physics)
        
        this.sprite = this.physics.create(this.x,this.y,sprite).setOrigin(0)
        this.sprite.porte_ref = this
        //console.log(this.sprite)
        //console.log("x :",this.x,"|y :",this.y)

    }


    //méthode




}

class Shortcut {

    constructor(x,y,direction,scene){

        this.x = x
        this.y = y
        this.scene = scene

        this.available = false
        this.direction = direction

        this.sprite = this.scene.add.sprite(this.x,this.y,'Shortcut')
        

    }
    
    toggleInteractive(){

        this.sprite.short_ref = this
        this.sprite.setInteractive()
        this.sprite.on('pointerdown', function() {
            console.log(this.short_ref.direction)
                this.short_ref.scene.GoUnderground(0)
             }, this.sprite);
        }

    }


