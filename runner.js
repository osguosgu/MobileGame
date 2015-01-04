
var game = new Phaser.Game(800, 1000, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var background;
var foreground;
var ground;
var player;
var object;

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

    platforms = game.add.group();

    platforms.enableBody = true;

  	ground = game.add.tileSprite(0, game.world.height - (200+30), 800, 30, 'ground');
	ground.autoScroll(-300, 0);

	game.physics.arcade.enable(ground);
  	ground.body.immovable = true;
  	ground.allowGravity = false;

  	player = game.add.sprite(100, game.world.height - 500, 'dude');

  	game.physics.arcade.enable(player);

  	player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = false;

    player.animations.add('jump', [0, 1, 2, 3, 4, 5, 6], 10, false);

    var button = game.add.button(0, 800, 'ollieButton', doOllie, this, 0, 0, 1);


    this.objectGenerator = game.time.events.loop(Phaser.Timer.SECOND * 2, generateObjects, this);
    this.objectGenerator.timer.start();
}

function update () {

	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(platforms, ground, objectToMove, null, this);

	if (player.x < -200){
		player.x = 100;
		player.y = game.world.height - 500;
		player.body.velocity.x = 0;

	}
}


function doOllie () {
	player.body.velocity.y = -400;
	player.animations.play('jump');
}

function generateObjects () {

	object = platforms.create(790, game.world.height - (200+80), 'object')

  	game.physics.arcade.enable(object);
  	object.body.gravity.y = 1000;

}

function objectToMove () {
	object.body.velocity.x = -300;

}