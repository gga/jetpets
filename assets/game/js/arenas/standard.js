var w = require('../world');

exports.name = 'Standard';

exports.background = '/game/images/grass.jpg';

exports.walls = [

  // outer box
  { x:  w.width / 2, y:  w.top,           width:  w.width, height: 1            },
  { x:  w.width / 2, y:  w.bottom,        width:  w.width, height: 1            },
  { x:  w.left,      y:  w.height * 1/6,  width:  1,       height: w.height / 3 },
  { x:  w.left,      y:  w.height * 5/6,  width:  1,       height: w.height / 3 },
  { x:  w.right,     y:  w.height * 1/6,  width:  1,       height: w.height / 3 },
  { x:  w.right,     y:  w.height * 5/6,  width:  1,       height: w.height / 3 },
];

exports.goals = {
  
  0: [
    { x:  w.left,    y:  w.height / 2,    width:  1,       height: w.height / 3 },
  ],
  
  1: [
    { x:  w.right,   y:  w.height / 2,    width:  1,       height: w.height / 3 },
  ]
  
};
