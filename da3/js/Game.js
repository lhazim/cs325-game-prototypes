"use strict";

GameStates.makeGame = function( game, shared ) {
	var cursors = null;
	var background = null;
	var world = null; 
	var ground = null;
    // blue stars: 10pts, 1.25 speed of gold stars
	// gold stars: 5 pts
    var stars_blue = null;
	var stars_gold = null;
	var star = null; 
	var fainting_couch = null;
	// score value & scoreboard text
	var score = 0; 
	var scoreboard = null;
	//timer decreases as score gets higher 
	//increasing frequency of stars increases difficulty
	//speed of fainting couch must increase in proportion 
	var blue_speed = null; 
	var gold_speed = null;
	var timer_blue = 8000; 
	var timer_gold = 1000; 
	//need to check current game time and in update loop check for elapsed time (timer_blue and timer_gold)
	//if time has elapsed -> create new star
	var time_check = null; 
	var last_spawn_blue = 0; 
	var last_spawn_gold = 0;
	//num of stars generated on the board
	var num_blue = 0; 
	var num_gold = 0;

	function caught(player, star){
		score += star.value;
		scoreboard.text = 'Score: ' + score; 
		if(star.color == 'b'){
			num_blue--;
		}
		if(star.color == 'g'){
			num_gold--; 
		}
		star.kill();
	}
	
	function death(ground, star){
		if(star.color == 'b'){
			num_blue--;
		}
		if(star.color == 'g'){
			num_gold--; 
		}
		star.kill();
	}
    
    return {
    
        create: function () {
            
			world = game.add.group();
			
			background = game.add.sprite(300, 300, 'background');
			background.scale.setTo(0.5,0.5);
			background.anchor.setTo(0.5,0.5);
			world.add(background);
			
            // Display score in the top right
			var style = { font: "32px Century Gothic", fill: "#fffeff" }; 
			scoreboard = game.add.text(40,40,'Score: 0',style);
			
			// Create player
			fainting_couch = game.add.sprite(game.world.centerX, 415, 'couch');
			fainting_couch.scale.setTo(0.67,0.67);
			fainting_couch.anchor.setTo( 0.5, 0.5 );
			
			// Enable physics
			game.physics.arcade.enable(fainting_couch);
			fainting_couch.body.collideWorldBounds = true; 
			fainting_couch.body.immovable = true; 
			fainting_couch.speed = 175; 
			
			cursors = game.input.keyboard.createCursorKeys();
			
			ground = game.add.sprite(600,590,'ground');
			ground.anchor.setTo(0.5,0.5);
			
			game.physics.arcade.enable(ground); 
			ground.body.immovable = true; 
			ground.body.onCollide = new Phaser.Signal();
			ground.body.onCollide.add(death, this);
			
			stars_blue = game.add.group(); 
			stars_blue.enableBody = true; 
			stars_gold = game.add.group();
			stars_gold.enableBody = true; 
			
			star = stars_gold.create(game.world.randomX, -150, 'gold');
			star.value = 5; 
			
			fainting_couch.body.onCollide = new Phaser.Signal();
			fainting_couch.body.onCollide.add(caught, this);
        },
    
        update: function () {
    

			
			//  Reset the players velocity (movement)
			fainting_couch.body.velocity.x = 0;
			// Get current time
			time_check = game.time.time;
			// Check for collisions: couch and stars
			// Check for collisions: ground and stars
			game.physics.arcade.collide(fainting_couch, stars_blue);
			game.physics.arcade.collide(fainting_couch, stars_gold); 
			game.physics.arcade.collide(ground, stars_blue);
			game.physics.arcade.collide(ground, stars_gold);
			
			if(time_check - last_spawn_blue > timer_blue && num_blue < 3){
				timer_blue = game.rnd.normal()*8000; 
				last_spawn_blue = time_check;
				star = stars_blue.create(game.world.randomX, -300, 'blue');
				star.scale.setTo(0.5,0.5);
				star.body.velocity.y = 100 + Math.random() * 200;
				star.value = 10;
				star.color = 'b';
				num_blue++;
			}
			
			if(time_check - last_spawn_gold > timer_gold && num_gold < 4){
				timer_gold = game.rnd.normal()*2000; 
				last_spawn_gold = time_check;
				star = stars_gold.create(game.world.randomX, -300, 'gold');
				star.scale.setTo(0.5,0.5);
				star.body.velocity.y = 80 + Math.random() * 200;
				star.value = 5;
				star.color = 'g';
				num_gold++;
			}

			if (cursors.left.isDown)
			{
				//  Move to the left
				fainting_couch.body.velocity.x = -1*fainting_couch.speed;
			}
			else if (cursors.right.isDown)
			{
				//  Move to the right
				fainting_couch.body.velocity.x = fainting_couch.speed;
			}
			//else if(cursors.down.isDown)
			//{
			//	world.angle = 90;
			//}
        }
    };
};
