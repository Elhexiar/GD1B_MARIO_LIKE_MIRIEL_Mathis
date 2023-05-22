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
        this.range = 800
        this.projectile_physics_group = projectile_group
        this.justShot = false
        this.cooldown = 500
        this.projectile_array = []
        this.hp = 20
        this.destroyed = false
        this.ammo_storage = new AmmoStorage(this.x,this.y,this)
        this.show_menu = true
        this.menu = new Tower_Menu(this.x,this.y,this.scene,this)
        this.level = 1
        this.upgrade_cost = 30*this.level
        this.damage = 1

        this.ammo = 60

        this.towerTarget_x = 5000
        this.towerTarget_y = 5000

        //this.circle_hitbox_range_physics_group = this.scene.physics.add.group({allowGravity : false})
        this.hitbox_range = this.scene.add.circle(this.x,this.y,this.range)
        //console.log('cercle :',this.hitbox_range)
        //this.scene.physics.add.existing(this.hitbox_range,true)



        //console.log(this.circle)


    }

        //méthode

    Build_Tower(){

        this.sprite = this.physics_group.create(this.x,this.y,'tower').setImmovable(true)
        //console.log(this.tilled_ref)
        this.hitbox = this.scene.add.rectangle(this.tilled_ref.x,this.tilled_ref.y+this.tilled_ref.height/2 , this.tilled_ref.width, this.tilled_ref.height);
        this.scene.physics.add.existing(this.hitbox,true)
        this.hitbox.tower_ref = this
        //console.log(this.hitbox)

    }

    SpawnArcher(){

        this.archer = new Archer(this.x,this.y-200,this.physics_group,this)

    }

    Update_Tower_Behaviour(){

        if(this.active == true){

            this.archer.sprite.anims.play('active_archer')

            if(this.justShot == false){

                if(this.ammo > 0){
                this.projectile_array.push(new projectile_archer(this.x,this.y,this.towerTarget_x,this.towerTarget_y,this.projectile_physics_group,this.scene,this))
                
                this.justShot = true
                this.ammo = this.ammo-1
                if(this.ammo < 0){
                    this.ammo = 0
                }

                this.ammo_storage.UpdateAmmoStorage()
                //console.log('piou')
                this.scene.time.delayedCall(this.cooldown,() => { this.justShot =  false },null,this)
                }else{
                    console.log("tower out of ammo !")
                }
                

            }
            

            //this.projectile_array.forEach(element => {
            //    this.scene.physics.add.collider(this.projectile)
            //});


            
            
        }else{

            if(this.destroyed == false){
            this.archer.sprite.anims.play('inactive_archer')
            this.towerTarget_x = 5000
            this.towerTarget_y = 5000
            }

        }
        if(this.show_menu == true){

            this.menu.Update_Menu()

        }else{

            this.menu.Hide()
        }

        this.archer.UpdateArcher()

        this.show_menu = false

    }

    kill(){

        this.sprite.destroy()
        this.active = false
        this.hitbox.destroy()
        this.archer.sprite.destroy()
        this.destroyed = true
        this.range = 0

        this.archer.bow.kill()

    }

    reFillAmmo(player){

        this.ammo = this.ammo + player.ammo
        if(this.ammo >60){

            player.ammo = this.ammo-60
            this.ammo = 60
        }else{
            player.ammo = 0
        }
        this.ammo_storage.UpdateAmmoStorage()

    }

    repair(player){

        this.hp = this.hp + player.ammo
        if(this.hp > 20){

            player.ammo = this.hp-20
            this.hp = 20
        }else{
            player.ammo = 0
        }



    }

    Upgrade(player){


        if(player.ammo >= this.upgrade_cost){
            this.level = this.level+1
            this.damage = this.level
            this.hp = this.level*20
            this.ammo = (this.level *30)+30
            player.ammo = player.ammo - this.upgrade_cost
        }



    }

    






    
}

class Tower_Menu {
    
    constructor(x,y,scene,tower_ref){

        this.x = x
        this.y = y
        this.scene = scene
        this.tower_ref = tower_ref
        this.tower_HP = tower_ref.hp
        this.tower_ammo = tower_ref.ammo
        this.hp_text = this.scene.add.text(this.x,this.y,"HP :"+this.tower_HP).setDepth(10)
        this.ammo_text = this.scene.add.text(this.x,this.y,"Ammo:"+this.tower_ammo).setDepth(10)
        this.level_text = this.scene.add.text(this.x,this.y,"level "+this.tower_ref.level).setDepth(10)
        this.upgrade_cost_text = this.scene.add.text(this.x,this.y,"UP : "+this.tower_ref.upgrade_cost+"$").setDepth(10)

    }

    Update_Menu(){
        //console.log(this.tower_ref.sprite.y)
        this.hp_text.visible = true
        this.ammo_text.visible = true
        this.level_text.visible = true
        this.upgrade_cost_text.visible = true
        this.x = this.tower_ref.sprite.x-30
        this.y = this.tower_ref.sprite.y-20
        this.hp_text.x = this.x
        this.hp_text.y = this.y
        this.tower_HP = this.tower_ref.hp
        this.hp_text.setText("HP : "+this.tower_HP)
        this.ammo_text.x = this.x
        this.ammo_text.y = this.y+20
        this.tower_ammo = this.tower_ref.ammo
        this.ammo_text.setText("Ammo:"+this.tower_ammo)
        this.level_text.x = this.x
        this.level_text.y = this.y+35
        this.level_text.setText("level "+this.tower_ref.level)
        this.upgrade_cost_text.x = this.x
        this.upgrade_cost_text.y = this.y + 50
        this.upgrade_cost_text.setText("UP : "+this.tower_ref.upgrade_cost)


    }

    Hide(){
        this.hp_text.visible = false
        this.ammo_text.visible = false
        this.level_text.visible = false
        this.upgrade_cost_text.visible = false
    }


}



class Archer {

    constructor(given_x,given_y,given_physics,tower){

        this.x = given_x
        this.y = given_y
        this.tower_ref = tower
        
        this.physics_group = given_physics
        this.sprite = this.physics_group.create(this.x,this.y,'archer')
        this.bow = new Bow(this.x,this.y,this,this.tower_ref)
        this.target = 'none'
    }

    UpdateArcherPos(){
        this.x = this.sprite.x
        this.y = this.sprite.y
    }

    UpdateArcher(){

        //console.log('archer_update')

        this.bow.UpdateBow()

    }


}

class Bow {

    constructor(given_x,given_y,archer_ref,tower_ref){

        this.x = given_x-20
        this.y = given_y
        this.tower_ref = tower_ref
        this.archer_ref = archer_ref
        
        this.physics_group = prop_phys_group
        this.sprite = this.physics_group.create(this.x,this.y,'bow')
        this.angle = 0

    }

    UpdateBow(){


        this.x = this.archer_ref.x -20
        this.y = this.archer_ref.y

        this.sprite.x = this.x
        this.sprite.y = this.y

        this.angle_offset = 200

        //console.log("angle before ",this.angle)
        this.angle = (Phaser.Math.Angle.Between(this.x,this.y,this.tower_ref.towerTarget_x,this.tower_ref.towerTarget_y)*180/3.28) + this.angle_offset
        this.sprite.angle = this.angle
        //console.log("angle after ",this.angle)

    }

    kill(){

        this.sprite.destroy()

    }


}

class projectile_archer {

    constructor(given_x,given_y,target_x,target_y,physics_group,scene,ref_tower){

        this.x = given_x
        this.y = given_y
        this.speed = 800
        this.tower_ref = ref_tower
        this.damage = this.tower_ref.damage

        this.physics_group = physics_group

        this.sprite = this.physics_group.create(this.x,this.y,'projectile')
        this.sprite.bullet_ref = this
        this.target_vector = new Phaser.Math.Vector2(target_x-this.x,target_y-this.y)
        //console.log(this.target_vector)
        this.target_vector.normalize()

        this.sprite.body.setVelocityX(this.target_vector.x*this.speed)
        this.sprite.body.setVelocityY(this.target_vector.y*this.speed)


    }

    kill(){

        this.sprite.destroy()

    }


}

function resetShot(){
    this.justShot = false
    console.log('reloaded',just_shot)
}

class AmmoStorage {
    
    constructor(tower_x,tower_y,tower_ref){

        this.x_offset = 50
        this.y_offset = 100
        this.x = tower_x+this.x_offset
        this.y = tower_y+this.y_offset
        this.tower_ref = tower_ref

        this.sprite = prop_phys_group.create(this.x,this.y,'ammo_storage').setDepth(8)
        this.sprite.anims.play('6_ammo')

    }

    UpdateAmmoStorage(){

        
        this.ammo_range = (this.tower_ref.ammo-this.tower_ref.ammo % 10)/ 10

        this.sprite.anims.play((this.ammo_range+'_ammo'))
    }

}