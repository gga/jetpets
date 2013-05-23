// reset players pos
// can move, but no ball

var Arena = require('../entities/arena');
var Player = require('../entities/player');
var GF = require('../engines/graphics-factory');
var world = require('../world');

var startingPos = [
  world.width / 12,
  world.width - world.width / 12
];

function WarmUp(game) {
  
  // ideally, the game can track it by ID
  // and we can remove it without holding a reference to it
  var text = null;
  
  this.enter = function() {
    
    game.addEntity(Arena.random(game, game.physics));
    game.addEntity(newPlayer(game.players, 0, 'p1'));
    game.addEntity(newPlayer(game.players, 1, 'p2'));
    
    getReady();
    
    setTimeout(function() {
      game.transition('ready');
    }, 2000);
    
  };
  
  this.exit = function() {
    // Would be better with:
    // game.deleteEntity('get-ready');
    game.stage.removeChild(text);
  };
  
  this.tick = function() {
  };
  
  this.on = function(message, args) {
  };
  
  function newPlayer(players, index, id) {
    return new Player(game, game.physics, {
      id: id,
      name: players[index].firstName + players[index].lastName,
      x: startingPos[index],
      y: world.height / 2 
    });
  }
  
  function getReady() {
    text = GF.text('GET READY');
    game.stage.addChild(text);
  }
  
}

module.exports = WarmUp;
