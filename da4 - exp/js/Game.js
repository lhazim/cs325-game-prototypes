"use strict";

GameStates.makeGame = function( game, shared ) {
	var cursors = null;
	//sprites
	var background = null;
	var world = null; 
	var ground = null;
	var right_b = null; 
	var left_b = null; 
    // blue stars: 10pts, 1.25 speed of gold stars
	// gold stars: 5 pts
    var stars_blue = null;
	var stars_gold = null;
	var star = null; 
	var fainting_couch = null;
	var world_orientation = 0;
	// score value & scoreboard text
	var score = 0; 
	var scoreboard = null;
	var lives = 5;
	var life = null; 
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
	//num of stars spawned on the board
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
		lives--;
		life.text = 'Lives: ' + lives; 
	}
	
	function flip_cw(sprite1, sprite2){
		world_orientation++; 
		background.angle = 90*world_orientation;
		stars_blue.forEach(function(item){
			var temp = null;
			temp = item.body.velocity.y;
			item.body.velocity.y = item.body.velocity.x;
			item.body.velocity.x = -1 * temp; 
			temp = item.y; 
			item.y = item.x; 
			item.x = temp; 
			item.angle = 90*world_orientation; 
		});
		stars_gold.forEach(function(item){
			var temp = null;
			temp = item.body.velocity.y;
			item.body.velocity.y = item.body.velocity.x;
			item.body.velocity.x = -1 * temp; 
			temp = item.y; 
			item.y = item.x; 
			item.x = temp; 
			item.angle = 90*world_orientation; 
		});
		fainting_couch.x = 100;
	}
	
	function flip_ccw(sprite1, sprite2){
		world_orientation--;
		background.angle = 90*world_orientation; 
		stars_blue.forEach(function(item){
			var temp = null;
			temp = item.body.velocity.y;
			item.body.velocity.y = item.body.velocity.x;
			item.body.velocity.x = temp; 
			temp = item.y; 
			item.y = item.x; 
			item.x = temp; 
			item.angle = 90*world_orientation; 
		});
		stars_gold.forEach(function(item){
			var temp = null;
			temp = item.body.velocity.y;
			item.body.velocity.y = item.body.velocity.x;
			item.body.velocity.x = temp; 
			temp = item.y; 
			item.y = item.x; 
			item.x = temp; 
			item.angle = 90*world_orientation; 
		});
		fainting_couch.x = 500;
	}
    
    return {
    
        create: function () {
            
			var music = game.add.audio('gameMusic');
			music.play(); 
			
			world = game.add.group();
			
			background = game.add.sprite(300, 300, 'background');
			background.scale.setTo(0.5,0.5);
			background.anchor.setTo(0.5,0.5);
			game.physics.arcade.enable(background);
			background.body.moves = false; 
			world.add(background);
			
            // Display score in the top right
			var style = { font: "32px Century Gothic", fill: "#fffeff" }; 
			scoreboard = game.add.text(40,40,'Score: 0',style);
			life = game.add.text(40,70,'Lives: 5', style); 
			game.add.text(500, 560, '\u2190   \u2192', style);
			
			// Create player
			fainting_couch = game.add.sprite(game.world.centerX, 415, 'couch');
			fainting_couch.scale.setTo(0.67,0.67);
			fainting_couch.anchor.setTo( 0.5, 0.5 );
			
			// Enable physics
			game.physics.arcade.enable(fainting_couch);
			//fainting_couch.body.collideWorldBounds = true; 
			fainting_couch.body.immovable = true; 
			fainting_couch.speed = 220; 
			
			cursors = game.input.keyboard.createCursorKeys();
			
			ground = game.add.sprite(0,600,'ground');
			right_b = game.add.sprite(598,0,'side');
			left_b = game.add.sprite(1,0,'side');
			
			game.physics.arcade.enable(ground); 
			ground.body.immovable = true; 
			game.physics.arcade.enable(right_b); 
			right_b.body.immovable = true; 
			game.physics.arcade.enable(left_b); 
			left_b.body.immovable = true; 
			
			stars_blue = game.add.group(); 
			stars_blue.enableBody = true; 
			stars_gold = game.add.group();
			stars_gold.enableBody = true; 
			world.add(stars_blue);
			world.add(stars_gold);
			
			star = stars_gold.create(game.world.randomX, -150, 'gold');
			star.value = 5; 
			
        },
    
        update: function () {
    

			
			//  Reset the players velocity (movement)
			fainting_couch.body.velocity.x = 0;
			// Get current time
			time_check = game.time.time;

			if (lives == 0){
				// reset lives
				// goto: GameOver
				lives = 5;
				num_blue = 0; 
				num_gold = 0;
				game.state.start('GameOver');
			}
			
			// Check for collisions: couch and stars
			// Check for collisions: ground and stars
			if(world_orientation === 0){
				game.physics.arcade.collide(fainting_couch, stars_blue, caught, null, this);
				game.physics.arcade.collide(fainting_couch, stars_gold, caught, null, this); 
				game.physics.arcade.collide(ground, stars_blue, death, null, this);
				game.physics.arcade.collide(ground, stars_gold, death, null, this);
				game.physics.arcade.collide(fainting_couch, right_b, flip_cw, null, this);
				game.physics.arcade.collide(fainting_couch, left_b, flip_ccw, null, this);
			}
			
			if(world_orientation === 1){
				game.physics.arcade.collide(fainting_couch, stars_blue, caught, null, this);
				game.physics.arcade.collide(fainting_couch, stars_gold, caught, null, this); 
				game.physics.arcade.collide(ground, stars_blue, death, null, this);
				game.physics.arcade.collide(ground, stars_gold, death, null, this);
				//game.physics.arcade.collide(fainting_couch, right_b, flip_cw, null, this);
				game.physics.arcade.collide(fainting_couch, left_b, flip_ccw, null, this);
			}
			
			if(world.orientation === -1){
				game.physics.arcade.collide(fainting_couch, stars_blue, caught, null, this);
				game.physics.arcade.collide(fainting_couch, stars_gold, caught, null, this); 
				game.physics.arcade.collide(ground, stars_blue, death, null, this);
				game.physics.arcade.collide(ground, stars_gold, death, null, this);
				game.physics.arcade.collide(fainting_couch, right_b, flip_cw, null, this);
				//game.physics.arcade.collide(fainting_couch, left_b, flip_ccw, null, this);
			}
			
			if(time_check - last_spawn_blue > timer_blue && num_blue < 3){
				timer_blue = game.rnd.normal()*8000; 
				last_spawn_blue = time_check;
				star = stars_blue.create(game.world.randomX, -300, 'blue');
				star.scale.setTo(0.5,0.5);
				star.body.velocity.y = 100 + Math.random() * 50;
				star.value = 10;
				star.color = 'b';
				num_blue++;
			}
			
			if(time_check - last_spawn_gold > timer_gold && num_gold < 4){
				timer_gold = game.rnd.normal()*2000; 
				last_spawn_gold = time_check;
				star = stars_gold.create(game.world.randomX, -300, 'gold');
				star.scale.setTo(0.5,0.5);
				star.body.velocity.y = 80 + Math.random() * 50;
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
        }
    };
};
