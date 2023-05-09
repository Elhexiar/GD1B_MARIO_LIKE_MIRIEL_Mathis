var config = {
    type: Phaser.AUTO,
    width: 1600, height: 900,
    physics: {
        default: 'arcade',
        arcade: {
        gravity: { y: 12000 },
        debug: true
        }
    },
    input:{gamepad:true},
    maxLights : 20, 

    scene: [test,surface]

   

};

var game = new Phaser.Game(config);
