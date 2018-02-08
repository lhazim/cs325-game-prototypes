"use strict";

function make_main_game_state( game )
{
    function preload() {
        // Load an image and call it 'logo'.
		game.load.image('cloud1','assets/cumulus-big1.png');
		game.load.image('cloud2','assets/cumulus-big2.png');
		game.load.image('cloud3','assets/cumulus-big3.png');
		game.load.image('cloud4','assets/cumulus-huge.png');
        game.load.image( 'crystal', 'assets/crystal.png' );
		game.load.image( 'particle', 'assets/rose.png' );
		game.load.audio('sound', 'assets/music_jewels.ogg');
    }
    
    var bouncy;
	var music;
	var cloudKeys;
	var cloudKey;
	var clouds;
	var crystals;
    
    function create() {
		
		// Only want world bounds on left and right
		game.physics.setBoundsToWorld();
		
		// Background color
		game.stage.backgroundColor = "#c2d6d7";
		
		// Background music
		music = game.add.audio('sound');
		music.loopFull();
		
		// Cloud keys
		cloudKeys = ['cloud1','cloud2','cloud3','cloud4'];
		
		clouds = game.add.group();
		clouds.enableBody = true;
		
		for (var x = 0; x < 10; x++)
		{
			cloudKey = game.rnd.pick(cloudKeys);
			var cloud = clouds.create(this.game.world.randomX, -100, cloudKey);
			cloud.checkWorldBounds = true;
			cloud.events.onOutOfBounds.add(cloudOut, this);
			cloud.body.velocity.y = 10 + Math.random() * 100;
		}
		
		crystals = game.add.group();
		crystals.enableBody = true;
		crystals.physicsBodyType = Phaser.Physics.ARCADE;
		crystals.inputEnableChildren = true;
		
		
		for (var x = 0; x < 5; x++)
		{
			var crystal = crystals.create(this.game.world.randomX, -150, 'crystal');
			crystal.checkWorldBounds = true;
			crystal.events.onOutOfBounds.add(crystalOut, this);
			crystal.body.velocity.y = 10 + Math.random() * 200;
			crystal.events.onInputDown.add(exploder,this);
		}
        // Create a sprite at the center of the screen using the 'logo' image.
        //	bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'crystal' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //	bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        //	game.physics.enable( bouncy, Phaser.Physics.ARCADE );
		//	bouncy.inputEnabled = true;
		//	bouncy.events.onInputDown.add(exploder, this);
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "this is not amazing (yet). click on the crystals.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
	
	function exploder(crystal, pointer){
		var emitter = this.game.add.emitter(pointer.x,pointer.y,100);
		emitter.makeParticles('particle');
		emitter.minParticleSpeed.setTo(-100, -100);
		emitter.maxParticleSpeed.setTo(85, 85);
		emitter.gravity = 30;
		emitter.start(true, 80000, null, 100);
		crystal.kill();
	}
	
	function cloudOut(cloud) {
		//  Move the cloud to the top of the screen again
		cloud.reset(this.game.world.randomX, -100);

		//  And give it a new random velocity
		cloud.body.velocity.y = 10 + Math.random() * 100;
	
	}
	
	function crystalOut(crystal) {
		//  Move the cloud to the top of the screen again
		crystal.reset(this.game.world.randomX, -150);

		//  And give it a new random velocity
		crystal.body.velocity.y = 10 + Math.random() * 200;
	
	}
    
    return { "preload": preload, "create": create, "update": update };
}

window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
