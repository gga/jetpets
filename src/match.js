var _ = require('underscore');
var bridge = require('./bridge');

exports.create = function(lobby) {
  
  var match = {};
  var players = lobby.state().players;
  
  bridge.send('match-start', players);
  
  match.hasPlayer = function(player) {
    return indexOf(player.id) != null;
  }
  
  match.send = function(player, action) {
    var idx = indexOf(player.id);
    if (idx != null) {
      bridge.send('player-action', {pindex: idx, action: action});
    }
  }
  
  match.forfeit = function(player) {
    var idx = indexOf(player.id);
    if (idx != null) {
      bridge.send('match-forfeit', {pindex: idx});
    }
  }
  
  function indexOf(id) {
    if (players[0].id === id) { return 0; }
    if (players[1].id === id) { return 1; }
    return null;
  }
  
  return match;
  
};
