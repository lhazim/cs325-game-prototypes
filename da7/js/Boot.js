"use strict";

var GameStates = {};

GameStates.makeBoot = function( game ) {
    return {
        init: function () {

            game.input.maxPointers = 1;
            game.stage.disableVisibilityChange = true;

            if (game.device.desktop)
            {
                game.scale.pageAlignHorizontally = true;
            }
            else
            {
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                game.scale.setMinMax(480, 260, 1024, 768);
                game.scale.forceLandscape = true;
                game.scale.pageAlignHorizontally = true;
            }

        },

        preload: function () {

            // https://opengameart.org/content/grid-hud
            game.load.image( 'menuBackground', 'assets/mainMenuGrid.png' );
            game.load.image( 'uiOverlay', 'assets/levelGrid.png' );
            game.load.image( 'levelBackground', 'assets/stars.png' );

            // https://gooseninja.itch.io/space-music-pack
            game.load.audio( 'menuMusic', ['assets/loading.wav'] );

            // pop-ups made by me
            game.load.image( 'soldierpopup', 'assets/soldierpopup.png' );
            game.load.image( 'sniperpopup', 'assets/sniperpopup.png' );
            game.load.image( 'blasterpopup', 'assets/blasterpopup.png' );

            // spaceships
            // https://opengameart.org/content/2d-spaceship-sprites-with-engines
            game.load.image( 'soldiership', 'assets/pilot_ship.png' );
            game.load.image( 'snipership', 'assets/sniper_ship.png' );
            game.load.image( 'blastership', 'assets/blaster_ship.png' );

            // bumpers
            game.load.image( 'vbumper', 'assets/vertical_bumper.png' );
            game.load.image( 'hbumper', 'assets/horizontal_bumper.png' );
        },

        create: function () {

            // https://mozz.itch.io/space-madness
            // http://www.html5gamedevs.com/topic/28424-solved-loading-custom-fonts-and-displaying-cyrillicfrenchturkish-characters/
            // HACK TO PRELOAD A CUSTOM FONT
	           this.game.add.text( 0, 0, "hack", { font:"1px SpaceMadness", fill:"#FFFFFF" } );
             this.game.add.text( 0, 0, "hack2", { font:"1px SpaceMadness", fill:"#FFFFFF" } );
            //  Go to: main menu
            game.state.start( 'MainMenu' );

        }
    };
};
