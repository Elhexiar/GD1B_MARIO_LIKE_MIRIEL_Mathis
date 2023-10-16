class construction_wheel {


    constructor(x,y,scene){
        
        this.x = x
        this.y = y
        this.active = true

        this.scene = scene
        

        this.tower_widget = this.scene.add.sprite(this.x -50 ,this.y, "tower_widget").setDepth(15)
        this.tower_widget.wheel_ref = this
        this.tower_widget.setInteractive()
        this.tower_widget.on('pointerdown', function() {
            this.wheel_ref.scene.build_tower_selected = true
            this.wheel_ref.scene.build_barricade_selected = false
            this.wheel_ref.kill_wheel()
         }, this.tower_widget);
         this.tower_cost = this.scene.add.text(this.x - 100,this.y +30 ,"cost:90").setDepth(20)

        this.exit_widget = this.scene.add.sprite(this.x,this.y +50 , "cross_widget").setDepth(15)
        this.exit_widget.wheel_ref = this
        this.exit_widget.setInteractive()
        this.exit_widget.on('pointerdown', function() {
            this.wheel_ref.kill_wheel()
         }, this.exit_widget);

        this.barricade_widget = this.scene.add.sprite(this.x+50 ,this.y , "barricade_widget").setDepth(15)
        this.barricade_widget.wheel_ref = this
        this.barricade_widget.setInteractive()
        this.barricade_widget.on('pointerdown', function() {
            this.wheel_ref.scene.build_barricade_selected = true
            this.wheel_ref.scene.build_tower_selected = false
            this.wheel_ref.kill_wheel()
         }, this.barricade_widget);
        this.barricade_cost = this.scene.add.text(this.x+20,this.y +30 ,"cost:20").setDepth(20)


        
    }

    Update_wheel(){

    }

    kill_wheel(){

        this.tower_widget.destroy()
        this.exit_widget.destroy()
        this.tower_cost.destroy()
        this.barricade_widget.destroy()
        this.barricade_cost.destroy()
        this.active = false
        this.scene.construction_wheel = null

    }

}