"use strict";

var GameStates = {};

//  The Google WebFont Loader will look for this object, so create it before loading the script.
// https://phaser.io/examples/v2/text/google-webfonts
var WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Press Start 2P']
    }

};

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

            //  Load the Google WebFont Loader script
            // https://phaser.io/examples/v2/text/google-webfonts
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        },

        create: function () {

            //  Go to: main menu
            game.state.start( 'MainMenu' );

        }
    };
};
