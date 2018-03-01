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

            background = game.add.sprite(0, 0, 'background');
			background.scale.setTo(0.5,0.5);
    
            //	Load the game assets
            game.load.audio('gameMusic', 'assets/otts.flac');
            //	+ lots of other required assets here
			game.load.image( 'blue','assets/star_blue.png');
			game.load.image('gold','assets/star_gold.png');
			game.load.image('couch','assets/couch.png');
			game.load.image('ground','assets/ground.png');
			game.load.image('side','assets/side.png');
        },
    
        create: function () {
    
			var style = { font: "18px Century Gothic", fill: "#fffeff", align: "left", boundsAlignH: "left", boundsAlignV: "top", wordWrap: true, wordWrapWidth: 450 }; 
			game.add.text(75,100,'“He stared up at the stars: and it seemed to him then that they were dancers, stately and graceful, performing a dance almost infinite in its complexity. He imagined he could see the very faces of the stars; pale, they were, and smiling gently, as if they had spent so much time above the world, watching the scrambling and the joy and the pain of the people below them, that they could not help being amused every time another little human believed itself the center of its world, as each of us does.” \n --- Neil Gaiman, Stardust ',style);
			var style2 = { font: "52px Century Gothic", fill: "#fffeff" };
			var start = game.add.text(300,500,'Start',style2); 
			start.inputEnabled = true; 
			start.events.onInputDown.add( startGame, this );
        },
    
        update: function () {
    
        }
    
    };
};
