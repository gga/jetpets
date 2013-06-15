var _     = require('../../../3rdparty/underscore-min');
var hub   = require('./hub');

function Sound() {
  
  var current = {};
  
  function play(args) {
    var sound = new Audio();
    current[args.file] = sound;
    sound.setAttribute('src', args.file);
    if (args.loop) {
      sound.setAttribute('loop', true);
    }
    sound.play();
    return sound;
  };
 
  function stop(args) {
    if (current[args.file]) {
      current[args.file].pause();
      delete current[args.file];
    }
  }
 
  hub.on('engine.sound.play', play);
  hub.on('engine.sound.stop', stop);
  
}

module.exports = Sound;
