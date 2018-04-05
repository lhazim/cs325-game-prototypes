"use strict";

GameStates.makeCharSele = function( game, shared ) {

	var background = null;
	var music = null;
	var soldier = null;
	var sniper = null;
	var blaster = null;
  var popup1 = null;
  var popup2 = null;
  var popup3 = null;
  var tween = null;

    //function startGame () {

      //    music.stop();
      //    game.state.start('CharSele');
    //}

		//function hover (text) {
			//text.fill = "#1DFF8E";
			//text.setShadow(-5, 5, 'rgba(0,0,0,0.5)', 0);
		//}

		//function unhover (text) {
			//text.fill = "#fffeff";
		//}

    function openFile() {

        // https://phaser.io/examples/v2/input/button-open-popup

        if ((tween !== null && tween.isRunning) || this.popup.scale.x === 1)
        {
            return;
        }

        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        tween = game.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        var popup_temp = this.popup;
        game.input.onDown.addOnce(closeFile, { popup: popup_temp } );
        soldier.alpha = 0.2;
        sniper.alpha = 0.2;
        blaster.alpha = 0.2;

    }

    function closeFile() {

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        tween = game.add.tween(this.popup.scale).to( { x: 0.0001, y: 0.0001 }, 500, Phaser.Easing.Elastic.In, true);
        soldier.alpha = 1;
        sniper.alpha = 1;
        blaster.alpha = 1;
    }

    return {

        create: function () {

						background = game.add.sprite( 0, 0, 'menuBackground' );
						var style = { font: "72px SpaceMadness", fill: "#fffeff", align: "center" };

            soldier = game.add.text( 300, 150, 'The soldier', style );
            sniper = game.add.text( 400, 500, 'The sniper', style );
            blaster = game.add.text( 650, 300, 'The firebomb', style );
            popup1 = game.add.sprite( 450, 300, 'soldierpopup' );
            popup2 = game.add.sprite( 450, 300, 'sniperpopup' );
            popup3 = game.add.sprite( 450, 300, 'blasterpopup' );

            soldier.fill = "#FF1D8E";
            soldier.anchor.setTo( 0.5, 0.5 );
            soldier.inputEnabled = true;
            soldier.events.onInputDown.add( openFile, { popup: popup1 } );
            //soldier.angle = game.rnd.integerInRange( -60, 60 );

            sniper.fill = "#1DFF8E";
            sniper.anchor.setTo( 0.5, 0.5 );
            sniper.angle = 5;
            sniper.inputEnabled = true;
            sniper.events.onInputDown.add( openFile, { popup: popup2 } );

            blaster.fill = "#FF8E1D";
            blaster.anchor.setTo( 0.5, 0.5 );
            blaster.angle = -15;
            blaster.inputEnabled = true;
            blaster.events.onInputDown.add( openFile, { popup: popup3 } );

            popup1.anchor.setTo( 0.5, 0.5 );
            popup1.scale.set(0.0001);

            popup2.anchor.setTo( 0.5, 0.5 );
            popup2.scale.set(0.0001);

            popup3.anchor.setTo( 0.5, 0.5 );
            popup3.scale.set(0.0001);

            //music = game.add.audio('menuMusic');
						//music.loop = true;
						//music.play();

            //playButton = game.add.button( 303, 400, 'playButton', startGame, null, 'over', 'out', 'down');

        },

        update: function () {

            //	Do some nice funky main menu effect here

        }

    };
};
