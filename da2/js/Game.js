"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
	var bouncy2 = null;
	var style  = null;
	var text_look = null;
	var text_take = null;
	var text_use = null;
	
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
			style = { font: "32px Courier", fill: "#00ff44" }; 
			var text_lookAt = game.add.text(0,0,object.look, style);
			text_lookAt.alignTo(object, Phaser.LEFT_TOP, 16);
			menuReset();
			game.time.events.add(Phaser.Timer.SECOND * 4, function(){text_lookAt.kill();}, this);
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
			
			text_look.inputEnabled = true;
			text_take.inputEnabled = true;
			text_use.inputEnabled = true; 
			
			// Create sprites.
            bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
			bouncy2 = game.add.sprite(game.world.centerX,game.world.centerY,'logo2');
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            bouncy.anchor.setTo( 0.5, 0.5 );
			bouncy.anchor.setTo(0.1,0.7);
            
            // Turn on the arcade physics engine for this sprite.
            game.physics.enable( bouncy, Phaser.Physics.ARCADE );
			game.physics.enable( bouncy2, Phaser.Physics.ARCADE );
            // Make it bounce off of the world bounds.
            bouncy.body.collideWorldBounds = true;
			bouncy2.body.collideWorldBounds = true;
            
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
            text.anchor.setTo( 0.5, 0.0 );
            
            // When you click on the sprite, you go back to the MainMenu.
            bouncy.inputEnabled = true;
            bouncy.events.onInputDown.add( displayMenu, this );
			bouncy2.inputEnabled = true;
            bouncy2.events.onInputDown.add( displayMenu, this );
			
			bouncy.look = 'This is logo1';
			bouncy2.look = 'This is logo2';
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
