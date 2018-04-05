"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var background = null;
	var music = null;
	var title = null;
	var stormod = null;
	var play = null;

    function startGame () {

          music.stop();
          game.state.start('CharSele');
    }

		function hover (text) {
			text.fill = "#1DFF8E";
			text.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
		}

		function unhover (text) {
			text.fill = "#fffeff";
		}

    return {

        create: function () {

						background = game.add.sprite( 0, 0, 'menuBackground' );
						var style = { font: "72px SpaceMadness", fill: "#fffeff", align: "center" };

						// Title: Untitled Space Thing
						title = game.add.text( 450, 150, 'untitled\nspace thing', style);
						title.fill = "#FF1D8E";
						title.anchor.setTo( 0.5, 0.5 );

						// Will eventually start a story mode
						stormod = game.add.text( 450, 350, 'story mode', style );
						stormod.anchor.setTo( 0.5, 0.5 );
						stormod.alpha = 0.2;

						// Go to: Character selection screen
						play = game.add.text( 450, 400, 'start', style );
						play.anchor.setTo( 0.5, 0.5 );
						play.inputEnabled = true;
						// https://phaser.io/examples/v2/text/text-events
						play.events.onInputOver.add(hover, this);
						play.events.onInputOut.add(unhover, this);
						play.events.onInputDown.add(startGame, this);

						// Play: music loop
						music = game.add.audio('menuMusic');
						music.loop = true;
						music.play();

        }

    };
};
