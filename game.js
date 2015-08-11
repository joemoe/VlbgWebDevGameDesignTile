
var game = new Phaser.Game(900, 340, Phaser.CANVAS, 'game');

var CoworkingGame = function(game) {

	this.map = null;
	this.layer = null;
	this.player = null;

	this.safetile = 1;
	this.gridsize = 20;

	this.speed = 150;
	this.threshold = 3;

}

CoworkingGame.prototype = {
	init: function() {
		this.physics.startSystem(Phaser.Physics.ARCADE);
	},

	preload: function () {
		this.load.baseURL = "http://localhost/p02-Phaser-Coworking/";
		this.load.crossOrigin = 'anonymous';

		this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('tiles', 'assets/tiles.png');
		this.load.image('player', 'assets/player.png');
	},

	create: function() {
		this.map = this.add.tilemap('map');
		this.map.addTilesetImage('Background', 'tiles');

		this.layer = this.map.createLayer("Walls");

		this.map.setCollision(3, true, this.layer);

		this.player = this.add.sprite(460, 220, 'player');
		this.player.anchor.set(0.5);
		this.player.width = 10;
		this.player.height = 10;

		this.physics.arcade.enable(this.player);

		this.cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		this.physics.arcade.collide(this.player, this.layer);

		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		if(this.cursors.left.isDown) {
			this.player.body.velocity.x = -150;
		} else if(this.cursors.right.isDown) {
			this.player.body.velocity.x = 150;
		} else if(this.cursors.up.isDown) {
			this.player.body.velocity.y = -150;
		} else if(this.cursors.down.isDown) {
			this.player.body.velocity.y = 150;
		}
	}
}

game.state.add('Game', CoworkingGame, true);