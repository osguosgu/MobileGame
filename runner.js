
var game = new Phaser.Game(800, 1000, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var background;
var foreground;

var player;

function preload () {
 
   	game.load.image('background', 'assets/mountains.png');
   	game.load.image('foreground', 'assets/forest.png');
   	game.load.image('ground', 'assets/ground.png');
   	game.load.image('object', 'assets/object.png');
   	game.load.spritesheet('dude', 'assets/skater.png', 160, 160);
   	game.load.spritesheet('ollieButton', 'assets/ollie.png', 800, 200);
}

function create () {
	game.physics.startSystem(Phaser.Physics.ARCADE);

   	background = game.add.tileSprite(0, 0, 800, game.cache.getImage('background').height, 'background');
   	foreground = game.add.tileSprite(0, 500, 800, game.cache.getImage('foreground').height, 'foreground');
   	background.autoScroll(-30,0);
   	foreground.autoScroll(-200,0);

  	this.game.stage.backgroundColor = 'aaa';

  	//  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
 
    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

  	var ground = platforms.create(0, game.world.height - (200+30), 'ground');
  	ground.body.immovable = true;
  	ground.scale.setTo(8, 1);

  	var object = platforms.create(600, game.world.height - (200+100))
  	object.body.immovable = true;

  	player = game.add.sprite(100, game.world.height - 500, 'dude');

  	game.physics.arcade.enable(player);

  	player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    player.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, false);

    var button = game.add.button(0, 800, 'ollieButton', doOllie, this, 0, 0, 1);


    this.objectGenerator = game.time.events.loop(Phaser.Timer.SECOND * 1.25, generateObjects, this);
    this.pipeGenerator.timer.start();
}

function update () {

	game.physics.arcade.collide(player, platforms);
}


function doOllie () {
	player.body.velocity.y = -400;
	player.animations.play('jump');
}