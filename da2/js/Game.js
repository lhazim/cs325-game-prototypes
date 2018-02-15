"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    let bouncy = null;
	let bouncy2 = null;
	let style  = null;
	let text_look = null;
	let text_take = null;
	let text_use = null;
	let text_message = null;
	let inventory = null; 
	
	function menuReset(){
		text_look.x = 100;
		text_look.y = -100;
		text_take.x = -100; 
		text_take.y = -100; 
		text_use.x = -100;
		text_use.y = -100;
	}
	
	function look(object){
		return function(){
			if(object.interactions[0]){
				text_message.text = object.look;
				text_message.alignTo(object, Phaser.LEFT_TOP, 16);
				menuReset();		
			}
			else{
				text_message.text = "I can't do that right now.";
				text_message.alignTo(object, Phaser.LEFT_TOP, 16);
				menuReset();
			}
			//game.time.events.add(Phaser.Timer.SECOND * 10, function(){text_lookAt.x=-100;text_lookAt.y=-100;}, this);
		};
	}
	
	function take(object){
		style = { font: "32px Courier", fill: "#00ff44" }; 
		var text_lookAt = game.add.text(0,0,'Something - take', style);
	}
	
	function use(object){
		style = { font: "32px Courier", fill: "#00ff44" }; 
		var text_lookAt = game.add.text(0,0,'Something - use', style);
	}
	
	function displayMenu(object){
		
		text_look.alignTo(object, Phaser.LEFT_TOP, 16);
		text_take.alignTo(object, Phaser.LEFT_TOP, 16,16);
		text_use.alignTo(object, Phaser.LEFT_TOP, 16,32);
		
		text_look.events.onInputDown.add( look(object) , this);
		
	}
    
    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Creating interaction menu off screen
			style = { font: "32px Courier", fill: "#00ff44" }; 
			text_look = game.add.text(-100,-100,'Look',style);
			text_take = game.add.text(-100,-100,'Take',style);
			text_use = game.add.text(-100,-100,'Use',style); 
			text_message = game.add.text(-100,-100,'', style);
			
			// Enabling input on interaction menu
			text_look.inputEnabled = true;
			text_take.inputEnabled = true;
			text_use.inputEnabled = true; 
			
			// Create sprites.
            bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
			bouncy2 = game.add.sprite(game.world.centerX,game.world.centerY,'logo2');
			
            // Anchoring the sprites
            bouncy.anchor.setTo( 0.5, 0.5 );
			bouncy.anchor.setTo(0.1,0.7);
            
            // Enabling input. Display the interaction menu when an object is clicked. 
            bouncy.inputEnabled = true;
            bouncy.events.onInputDown.add( displayMenu, this );
			bouncy2.inputEnabled = true;
            bouncy2.events.onInputDown.add( displayMenu, this );
			
			// Setting the text that displays when a player looks at an objects. 
			bouncy.look = 'This is logo1';
			bouncy2.look = 'This is logo2';
			bouncy.label = 'Bedsheets';
			bouncy.interactions = [1,1,1];
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            // bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        }
    };
};
