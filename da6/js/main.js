"use strict";

window.onload = function() {

	//	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game( 900, 600, Phaser.AUTO, 'game' );

	//	Add the States your game has.
	//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.

	// An object for shared variables, so that them main menu can show
	// the high score if you want.
	// 1 - soldier
	// 2 - sniper
	// 3 - firebomb
	var shared = { };

	game.state.add( 'Boot', GameStates.makeBoot( game ) );
	game.state.add( 'MainMenu', GameStates.makeMainMenu( game, shared ) );
	// Character selection screen
	game.state.add( 'CharSele', GameStates.makeCharSele( game, shared ) );
	// Level 0 - 'Defense mission'/Asteroid blaster (tutorial)
	//game.state.add( 'Level0', GameStates.makeLevel0( game, shared ) );
	// Character dashboard
	//game.state.add('Dash',GameStates.makeDash( game, shared ) );
	// Death
	//game.state.add('Death',GameStates.makeDeath( game, shared ) );


	//	Now start the Boot state.
	game.state.start('Boot');

};
