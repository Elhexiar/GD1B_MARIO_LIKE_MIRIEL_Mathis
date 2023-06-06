
const WIDTH = 1600;
const HEIGHT = 900;
const ZOOM_FACTOR = 1; 

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  zoomFactor: ZOOM_FACTOR,
  leftTopCorner: {
    x: (WIDTH - (WIDTH / ZOOM_FACTOR)) / 2,
    y: (HEIGHT - (HEIGHT / ZOOM_FACTOR)) / 2
  }
}



var config = {
    type: Phaser.AUTO,
    pixelArt : true,
    scale: {
      parent: 'game_viewport',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: SHARED_CONFIG.width, 
      height: SHARED_CONFIG.height,
    },
    //width: SHARED_CONFIG.width, height: SHARED_CONFIG.height,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 2500 },
        debug: false
        }
    },
    fps:{target : 60},
    input:{gamepad:true},
    maxLights : 20, 

    scene: [Start_scene,surface,underground_level_01,UI_Scene,Tutorial_scene]

   

};

var game = new Phaser.Game(config);
