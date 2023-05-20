class UI {
    constructor(given_x,given_y,scene_ref){

        this.x = given_x
        this.y = given_y
        this.active = false
        this.scene = scene_ref
        this.nb_component = 0
        this.progress_bar = new progress_bar()
        this.cursor_ref = this.progress_bar.cursor
        
        

    }


}


class progress_bar {
    constructor(scene_ref){

        this.scene = scene_ref
        this.width
        this.x = 100
        this.y = 100
        this.bg_sprite = scene_ref.add.image(this.x,this.y,'progress_bar_bg').setScaleFactor(0)
        this.positive_sprite


        this.cursor = new progress_bar_cursor(this.scene)

    }


}

class progress_bar_cursor{

    constructor(scene_ref){

        this.scene = scene_ref
        this.sprite

    }


}