// reset players pos
// can move, but no ball

var Arena = require('../entities/arena');
var Player = require('../entities/player');
var Text = require('../entities/text');
var GF = require('../engines/graphics-factory');
var world = require('../world');

var startingPos = [
  world.width / 12,
  world.width - world.width / 12
];

function WarmUp(game) {
  
  this.enter = function() {

    game.addEntity(new Arena());
    game.addEntity(new Player('p1', startingPos[0], world.height / 2));
    game.addEntity(new Player('p2', startingPos[1], world.height / 2));
    game.addEntity(new Text('get-ready', 'GET READY!'));

    setTimeout(function() {
      game.transition('ready');
    }, 2000);    

  };
  
  this.exit = function() {
    game.deleteEntity('get-ready');
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
}

module.exports = WarmUp;
