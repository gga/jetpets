var GameEngine      = require('./game-engine');
var bridgeSocket    = require('./bridge/socket');
var bridgeKeyboard  = require('./bridge/keyboard');
var scoreView       = require('../views/scores.hbs');

window.Main = function() {
  
  var gameEngine  = null;

  var board           = document.querySelector('#board');
  var debugCanvas     = document.querySelector('#debugDraw');
  var scoreContainer  = document.querySelector('#scores');
  
  scoreContainer.innerHTML = scoreView({
    p1: { name: '-', score: 0 },
    p2: { name: '-', score: 0 }
  });
  
  // Wire external events
  bridgeKeyboard.connect(matchStart, matchMove);
  bridgeSocket.connect(matchStart, matchMove);
  
  function matchStart(players) {
    // Cleanup any previous game?
    gameEngine = new GameEngine({
      players: players,
      debugDraw: debugCanvas
    });
    board.appendChild(gameEngine.view);
    scoreContainer.innerHTML = scoreView({
      p1: { name: players[0].name, score: 0 },
      p2: { name: players[1].name, score: 0 }
    });
  }

  function matchMove(args) {
    if (gameEngine) {
      gameEngine.input('move', args);
    }
  }

};





//
//
// Old code, where do we put this?
//
//

/*
  var assetLoader = new PIXI.AssetLoader(['/game/images/paddle.png', '/game/images/ball.png', '/game/images/particle.png']);
  assetLoader.onComplete = function() {
    console.log('Assets loaded. Starting game.')
    bridgeSocket.connect(matchStart, matchMove);
    bridgeKeyboard.connect(matchStart, matchMove);
  };

  console.log('Loading assets');
  assetLoader.load();
*/
