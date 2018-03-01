"use strict";

GameStates.makeGameOver = function( game ) {

	var background = null;

	function startGame(pointer) {


        //	And start the actual game
        game.state.start('Game');

    }
	
    return {
    
        preload: function () {

            
        },
    
        create: function () {
    
			background = game.add.sprite(0, 0, 'background');
			background.scale.setTo(0.5,0.5);
			var style = { font: "40px Century Gothic", fill: "#fffeff" };
			var gameover = game.add.text(200,300,'Game Over',style);
            var playagain = game.add.text(300,500,'Play Again?',style);
			playagain.inputEnabled = true; 
			playagain.events.onInputDown.add( startGame, this);
        },
    
        update: function () {
    
        }
    
    };
};
