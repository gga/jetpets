'use strict';

var routie = require('../../3rdparty/routie');
var player = require('./player');

window.Device = function() {
  
  routie({
    '':            require('./controllers/register'),
    '/register':   require('./controllers/register'),
    '/wait':       require('./controllers/wait'),
    '/join':       require('./controllers/join'),
    '/lobby':      require('./controllers/lobby'),
    '/gamepad':    require('./controllers/gamepad'),
    '/thanks':     require('./controllers/thanks')
  });
  
  $('#menu').on('click', function() {
    if (window.confirm('disconnect player?')) {
      player.reset();
      routie.navigate('/');
    }
  });
  
};