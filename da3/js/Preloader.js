"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;
	var playButton = null;

	function startGame(pointer) {


        //	And start the actual game
        game.state.start('Game');

    }
	
    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'background');
			background.scale.setTo(0.67,0.67);
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            // game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('titlePage', 'assets/title.jpg');
            game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
			game.load.image( 'blue','assets/star_blue.png');
			game.load.image('gold','assets/star_gold.png');
			game.load.image('couch','assets/couch.png');
			game.load.image('ground','assets/ground.png');
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            //preloadBar.cropEnabled = false;
			var style = { font: "18px Century Gothic", fill: "#fffeff", align: "left", boundsAlignH: "left", boundsAlignV: "top", wordWrap: true, wordWrapWidth: 500 }; 
			game.add.text(150,200,'“He stared up at the stars: and it seemed to him then that they were dancers, stately and graceful, performing a dance almost infinite in its complexity. He imagined he could see the very faces of the stars; pale, they were, and smiling gently, as if they had spent so much time above the world, watching the scrambling and the joy and the pain of the people below them, that they could not help being amused every time another little human believed itself the center of its world, as each of us does.” \n --- Neil Gaiman, Stardust ',style);
			var style2 = { font: "72px Century Gothic", fill: "#fffeff" };
			var start = game.add.text(400,550,'Start',style2); 
			start.inputEnabled = true; 
			start.events.onInputDown.add( startGame, this );
        },
    
        update: function () {
    
        }
    
    };
};
