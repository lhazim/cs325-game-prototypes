"use strict";

GameStates.makeCharSele = function( game, shared ) {

	var background = null;
	var soldier = null;
	var sniper = null;
	var blaster = null;
	var start = null;
  var popup1 = null;
  var popup2 = null;
  var popup3 = null;
  var tween = null;

  function createPlayer () {

					switch( this.char ) {
							case 1:
									shared.char = this.char;
									// Update the shared player object
									shared.player = game.make.sprite( 450, 300, 'soldiership' );
							 		break;
							case 2:
									shared.char = this.char;
									// Update the shared player object
									shared.player = game.make.sprite( 450, 300, 'snipership' );
									break;
							case 3:
									shared.char = this.char;
									// Update the shared player object
									shared.player = game.make.sprite( 450, 300, 'blastership' );
									break;
					}
					shared.player.anchor.setTo( 0.5, 0.5 );
					shared.player.scale.setTo( 0.5 );
					game.physics.arcade.enable(shared.player);
					shared.player.body.enable = true;
					shared.player.body.collideWorldBounds = true;
					game.music.stop();
          game.state.start( 'Level0' );
    }

    function openFile() {

        // https://phaser.io/examples/v2/input/button-open-popup

        //  Create a tween that will pop-open the window
        tween = game.add.tween( this.popup.scale ).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true );
        game.input.onDown.addOnce( closeFile, { popup: this.popup } );
        soldier.alpha = 0.2;
        sniper.alpha = 0.2;
        blaster.alpha = 0.2;
				var style = { font: "64px SpaceMadness", fill: "#fffeff", align: "center" };
				start = game.add.text( 295, 195, 'play→', style );
				start.anchor.setTo( 1, 1 );
				this.popup.addChild(start);
				start.inputEnabled = true;
				start.events.onInputDown.add( createPlayer, { char: this.char } );

				// Use this to fill out character info when I feel like doing that
				//switch( this.char ) {
					//case 1:
						//	start.events.onInputDown.add( openFile, { popup: popup2, char: 2 } );
							//break;
					//case 2:

							//break;
					//case 3:
							//break;
				//}

    }

    function closeFile() {

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        tween = game.add.tween( this.popup.scale ).to( { x: 0.0001, y: 0.0001 }, 500, Phaser.Easing.Elastic.In, true );
        soldier.alpha = 1;
        sniper.alpha = 1;
        blaster.alpha = 1;
    }

    return {

        create: function () {

						background = game.add.sprite( 0, 0, 'menuBackground' );
						var style = { font: "72px SpaceMadness", fill: "#fffeff", align: "center" };

						// order matters here
            soldier = game.add.text( 300, 150, 'The soldier', style );
            sniper = game.add.text( 400, 500, 'The sniper', style );
            blaster = game.add.text( 650, 300, 'The firebomb', style );
            popup1 = game.add.sprite( 450, 300, 'soldierpopup' );
            popup2 = game.add.sprite( 450, 300, 'sniperpopup' );
            popup3 = game.add.sprite( 450, 300, 'blasterpopup' );

            soldier.fill = "#FF1D8E";
            soldier.anchor.setTo( 0.5, 0.5 );
            soldier.inputEnabled = true;
            soldier.events.onInputDown.add( openFile, { popup: popup1, char: 1 } );

            sniper.fill = "#1DFF8E";
            sniper.anchor.setTo( 0.5, 0.5 );
            sniper.angle = 5;
            sniper.inputEnabled = true;
            sniper.events.onInputDown.add( openFile, { popup: popup2, char: 2 } );

            blaster.fill = "#FF8E1D";
            blaster.anchor.setTo( 0.5, 0.5 );
            blaster.angle = -15;
            blaster.inputEnabled = true;
            blaster.events.onInputDown.add( openFile, { popup: popup3, char: 3 } );

            popup1.anchor.setTo( 0.5, 0.5 );
            popup1.scale.set( 0.0001 );

            popup2.anchor.setTo( 0.5, 0.5 );
            popup2.scale.set( 0.0001 );

            popup3.anchor.setTo( 0.5, 0.5 );
            popup3.scale.set( 0.0001 );


        },

        update: function () {

            //	Do some nice funky main menu effect here

        }

    };
};
