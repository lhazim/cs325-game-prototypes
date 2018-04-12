"use strict";

GameStates.makeLevel0 = function( game, shared ) {

	var background = null;
	var ui = null;
	var overlay = null;
	var cursors = null;
	var bumpers = null;
	var music = null; // reminder: pick combat music


    return {

        create: function () {

					  game.physics.startSystem(Phaser.Physics.ARCADE);
						game.world.setBounds( 0, 0 , 1200, 1300 );
						game.physics.setBoundsToWorld();

						// reminder: find a better background
						background = game.add.tileSprite( 0, 0, 900, 600, 'levelBackground' );
						background.tileScale.x = 2;
						background.tileScale.y = 2;

						// add player to display
						this.add.existing( shared.player );
						shared.player.x = 600;
						shared.player.y = 900;

						// ui overlay
						ui = game.add.group();
						ui.fixedToCamera = true;
						ui.create( 0, 0, 'uiOverlay' );
						// add: health bar
						// add: retreat option

						bumpers = game.add.group();
						bumpers.fixedToCamera = true;
						bumpers.enableBody = true;
						var bumper = bumpers.create( 150, 100, 'vbumper' );
						bumper.body.immovable = true;
						bumper = bumpers.create( 150, 100, 'hbumper' );
						bumper.body.immovable = true;
						bumper = bumpers.create( 750, 100, 'vbumper' );
						bumper.body.immovable = true;
						bumper = bumpers.create( 150, 500, 'hbumper' );
						bumper.body.immovable = true;


						game.camera.follow( shared.player );
						game.camera.deadzone = new Phaser.Rectangle( 250, 200, 450, 250 );
						game.camera.focusOnXY(0, 0);

						cursors = game.input.keyboard.createCursorKeys();

						var style = { font: "72px SpaceMadness", fill: "#fffeff", align: "center" };


        },

        update: function () {

						// Play: music loop
						game.music = this.add.audio('levelMusic');
						game.music.loop = true;
						//game.music.play();

						game.physics.arcade.collide(bumpers, shared.player);
						// collision between bumpers and enemies
						// collision between players and enemies

						if(shared.player.alive) {
								//  Reset the player, then check for movement keys
			      		shared.player.body.velocity.setTo(0, 0);

			        	if (cursors.left.isDown)
			        	{
			            	shared.player.body.velocity.x = -200;
			        	}
			        	else if (cursors.right.isDown)
			        	{
			            	shared.player.body.velocity.x = 200;
			        	}
								else if (cursors.up.isDown)
								{
										shared.player.body.velocity.y = -200;
								}
								else if (cursors.down.isDown)
								{
										shared.player.body.velocity.y = 200;
								}
						}

        }

    };
};
