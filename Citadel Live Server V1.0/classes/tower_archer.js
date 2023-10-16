class TowerManager {

    constructor(projectile_physics_group,scene){
    this.tower_list = []
    this.tower_number = 0
    this.projectile_physics_group = projectile_physics_group
    this.scene = scene



    }

    addNewTowerFromTilled(tilled_object,given_physics,scene){

        this.tower_list.push(new Tower_archer(tilled_object,given_physics,scene,this.projectile_physics_group))
        this.tower_list[this.tower_number].Build_Tower_From_Tilled();
        this.createTowerCollide(this.tower_number)
        
        this.tower_number += 1

    }

    createTowerCollide(i){

        

        this.tower_list[i].SpawnArcher();
        this.scene.physics.add.collider(this.scene.structure,this.tower_list[i].hitbox)
        
        this.scene.physics.add.overlap(this.scene.ennemie_phy,this.tower_list[i].hitbox,EnnemieHitStructure,null,this.scene)
        this.scene.physics.add.collider(this.scene.ennemie_phy,this.tower_list[i].hitbox);

        this.scene.physics.add.overlap(this.scene.player.player_sprite,this.tower_list[i].hitbox,PlayerAboveTower,null,this.scene)

    }

    BuildNewTower(coord){

        this.tower_list.push(new Tower_archer(coord,this.scene.structure,this.scene,this.projectile_physics_group))
        this.tower_list[this.tower_number].Build_Tower_From_Coord(coord);
        this.createTowerCollide(this.tower_number)
        this.tower_number += 1

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

        this.default_height = 180
        this.default_width = 100

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
        this.max_ammo = 60
        this.max_hp = 20

        this.towerTarget_x = 0
        if(this.x > 3000){
            this.towerTarget_x = 100000

        }
        this.towerTarget_y = 100

        //this.circle_hitbox_range_physics_group = this.scene.physics.add.group({allowGravity : false})
        this.hitbox_range = this.scene.add.circle(this.x,this.y,this.range)
        //console.log('cercle :',this.hitbox_range)
        //this.scene.physics.add.existing(this.hitbox_range,true)



        //console.log(this.circle)


    }

        //méthode

    Build_Tower_From_Tilled(){

        this.sprite = this.physics_group.create(this.x,this.y,'tower').setImmovable(true).setScale(3,3)
        if(this.x > 3000){
            this.sprite.setFlipX(true)
        }
        //console.log(this.tilled_ref)
        this.hitbox = this.scene.add.rectangle(this.tilled_ref.x,this.tilled_ref.y+this.tilled_ref.height/2 , this.tilled_ref.width, this.tilled_ref.height);
        this.scene.physics.add.existing(this.hitbox,true)
        this.hitbox.structure_ref = this
        //console.log(this.hitbox)

    }

    Build_Tower_From_Coord(){

        this.sprite = this.physics_group.create(this.x,500,'tower').setImmovable(true).setScale(3,3)
        if(this.x > 3000){
            this.sprite.setFlipX(true)
        }

        //console.log(this.tilled_ref)
        this.hitbox = this.scene.add.rectangle(this.x,590 , this.default_width, this.default_height);
        this.scene.physics.add.existing(this.hitbox,true)
        this.hitbox.structure_ref = this
        //console.log(this.hitbox)

    }

    SpawnArcher(){

        this.archer = new Archer(this.x,300,this.physics_group,this)

    }

    Update_Tower_Behaviour(){

        if(this.active == true){

            this.archer.sprite.anims.play('active_archer')

            if(this.justShot == false){

                if(this.ammo > 0){
                this.projectile_array.push(new projectile_archer(this.archer.bow.x,this.archer.bow.y+55,this.towerTarget_x,this.towerTarget_y,this.projectile_physics_group,this.scene,this))
                
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
            this.towerTarget_x = 0
            if(this.x > 3000){
                this.towerTarget_x = 100000

            }
            this.towerTarget_y = 100
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
        if(this.ammo >this.max_ammo){

            player.ammo = this.ammo-this.max_ammo
            this.ammo = this.max_ammo
        }else{
            player.ammo = 0
        }
        this.ammo_storage.UpdateAmmoStorage()

    }

    repair(player){

        this.hp = this.hp + player.ammo
        if(this.hp > this.max_hp){

            player.ammo = this.hp-this.max_hp
            this.hp = this.max_hp
        }else{
            player.ammo = 0
        }



    }

    Upgrade(player){


        if(player.ammo >= this.upgrade_cost){
            player.ammo = player.ammo - this.upgrade_cost
            this.level = this.level+1
            this.damage = this.level*1.5
            this.max_hp = this.level*20
            this.max_ammo = (this.level *30)+30
            this.upgrade_cost = this.level * 60 -30
            
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

        this.reload_widget = this.scene.add.sprite(this.x, this.y,"reload widget").setDepth(10)
        this.reload_widget.menu_ref = this
        this.reload_widget.setInteractive()
        this.reload_widget.on('pointerdown', function() {
            this.menu_ref.tower_ref.reFillAmmo(this.menu_ref.scene.player)
         }, this.reload_widget);

        this.upgrade_widget = this.scene.add.sprite(this.x, this.y,"upgrade widget").setDepth(10)
        this.upgrade_widget.menu_ref = this
        this.upgrade_widget.setInteractive()
        this.upgrade_widget.on('pointerdown', function() {
            this.menu_ref.tower_ref.Upgrade(this.menu_ref.scene.player)
         }, this.upgrade_widget);

        this.repair_widget = this.scene.add.sprite(this.x, this.y,"repair widget").setDepth(10)
        this.repair_widget.menu_ref = this
        this.repair_widget.setInteractive()
        this.repair_widget.on('pointerdown', function() {
            this.menu_ref.tower_ref.repair(this.menu_ref.scene.player)
         }, this.repair_widget);

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
        this.hp_text.setText("HP : "+this.tower_HP+"/"+this.tower_ref.max_hp)
        this.ammo_text.x = this.x
        this.ammo_text.y = this.y+20
        this.tower_ammo = this.tower_ref.ammo
        this.ammo_text.setText("Ammo:"+this.tower_ammo+"/"+this.tower_ref.max_ammo)
        this.level_text.x = this.x
        this.level_text.y = this.y+35
        this.level_text.setText("level "+this.tower_ref.level)
        this.upgrade_cost_text.x = this.x
        this.upgrade_cost_text.y = this.y + 50
        this.upgrade_cost_text.setText("UP : "+this.tower_ref.upgrade_cost)

        this.reload_widget.setInteractive()
        this.reload_widget.visible = true
        this.reload_widget.x = this.x -32
        this.reload_widget.y = this.y +190

        this.upgrade_widget.setInteractive()
        this.upgrade_widget.visible = true
        this.upgrade_widget.x = this.x +32
        this.upgrade_widget.y = this.y + 190

        this.repair_widget.setInteractive()
        this.repair_widget.visible = true
        this.repair_widget.x = this.x +100
        this.repair_widget.y = this.y + 190


    }

    Hide(){
        this.hp_text.visible = false
        this.ammo_text.visible = false
        this.level_text.visible = false
        this.upgrade_cost_text.visible = false

        this.reload_widget.visible = false
        this.reload_widget.disableInteractive()

        this.upgrade_widget.visible = false
        this.upgrade_widget.disableInteractive()

        this.repair_widget.visible = false
        this.repair_widget.disableInteractive()

    }


}



class Archer {

    constructor(given_x,given_y,given_physics,tower){

        this.x = given_x
        this.y = given_y
        this.tower_ref = tower
        
        this.physics_group = given_physics
        this.sprite = this.physics_group.create(this.x,this.y,'archer')
        if(this.x > 3000){
            this.sprite.setFlipX(true)
        }
        this.bow = new Bow(this.x,this.y,this,this.tower_ref)
        this.target = 'none'
    }

    UpdateArcherPos(){
        
    }

    UpdateArcher(){

        //console.log('archer_update')
        this.x = this.sprite.x
        this.y = this.sprite.y

        this.bow.UpdateBow()

    }


}

class Bow {

    constructor(given_x,given_y,archer_ref,tower_ref){

        this.x = given_x
        this.y = given_y
        this.tower_ref = tower_ref
        this.archer_ref = archer_ref
        this.angle_offset = 180
        
        
        this.physics_group = prop_phys_group
        this.sprite = this.physics_group.create(this.x,this.y,'bow')
        this.angle = 0

        
        

    }

    UpdateBow(){


        this.x = this.archer_ref.x
        if(this.x > 3000){
            
            this.angle_offset = 180
        }
        this.y = this.archer_ref.y-10

        this.sprite.x = this.x
        this.sprite.y = this.y

        //this.angle_offset = 200

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
        this.y = given_y-50
        this.speed = 800
        this.tower_ref = ref_tower
        this.damage = this.tower_ref.damage

        this.physics_group = physics_group

        this.sprite = this.physics_group.create(this.x,this.y,'projectile').setScale(2,2)
        this.sprite.angle = Phaser.Math.Angle.Between(target_x,target_y,this.x,this.y)*180/3.28 -90
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

        this.x_offset = 0
        this.y_offset = 175
        this.x = tower_x+this.x_offset
        this.y = tower_y+this.y_offset
        this.tower_ref = tower_ref

        this.sprite = prop_phys_group.create(this.x,675,'ammo_storage').setDepth(2)
        this.sprite.anims.play('6_ammo')

    }

    UpdateAmmoStorage(){

        
        this.ammo_range = (this.tower_ref.ammo-this.tower_ref.ammo % 10)/ 10

        this.sprite.anims.play((this.ammo_range+'_ammo'))
    }

}


