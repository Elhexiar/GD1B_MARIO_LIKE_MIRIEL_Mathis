
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
    width: SHARED_CONFIG.width, height: SHARED_CONFIG.height,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 1000 },
        debug: false
        }
    },
    input:{gamepad:true},
    maxLights : 20, 

    scene: [surface,underground_level_01,UI_Scene]

   

};

var game = new Phaser.Game(config);
