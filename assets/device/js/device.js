var routie = require('../../3rdparty/routie');

window.Pong = {}
Pong.Device = function() {
  
  routie({
      '':            require('./controllers/register'),
      '/register':   require('./controllers/register'),
      '/wait':       require('./controllers/wait'),
      '/join':       require('./controllers/join'),
      '/lobby':      require('./controllers/lobby'),
      '/gamepad':    require('./controllers/gamepad'),
      '/thanks':     require('./controllers/thanks')
  });
  
};