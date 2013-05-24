var _               = require('../../3rdparty/underscore-min');
var PhysicsEngine   = require('./engines/physics-engine');
var SoundEngine     = require('./engines/sound-engine');
var ParticleEngine  = require('./engines/particle-engine');
var ticker          = require('./engines/ticker');
var EntityTracker   = require('./entitytracker');
var GameStates      = require('./game-states');
var Time            = require('./time');
var world           = require('./world');
var hub             = require('./hub');


var GameEngine = function(data) {
  
  var renderer  = PIXI.autoDetectRenderer(960, 480);
  var stage     = new PIXI.Stage();
  var physics   = new PhysicsEngine();
  var sound     = new SoundEngine();
  var particles = new ParticleEngine(this);
  var states    = new GameStates(this);
  var tracker   = new EntityTracker();
  var time      = new Time();
  
  var nextTickActions = [];
  
  //physics.debugDraw(data.debugDraw);
  
  this.players  = data.players;  
  this.view     = renderer.view;
  
  // ----- temporary until entities don't need a ref to these engines anymore
  this.stage    = stage;
  this.physics  = physics;
  // -----
  
  physics.collision(function(fixtureA, fixtureB, points) {
    //console.log('[collision] ' + fixtureA.GetUserData().entityId + ' / ' + fixtureB.GetUserData().entityId);
    if (fixtureA.GetUserData() && fixtureB.GetUserData()) {
      var entityA = tracker.find(fixtureA.GetUserData().entityId);
      var entityB = tracker.find(fixtureB.GetUserData().entityId);
      if (entityA && entityB) {
        entityA.collision(entityB, points);
        entityB.collision(entityA, points);      
      }
    }
  });
  
  this.forget = function(entity) {
    tracker.forget(entity);
  };
  
  this.addEntity = function(entity) {
    if (entity.id) {
      //console.log('Adding entity: ', entity.id);
      tracker.track(entity);
      if (entity.create) {
        entity.create(physics, stage);
      }
    } else {
      console.log('Entity should have an ID', entity);
    }
  };

  this.deleteEntity = function(id) {
    var entity = tracker.find(id);
    if (entity) {
      if (entity.destroy) {
        entity.destroy(physics, stage);
      }
      tracker.forget(entity);
    } else {
      console.log('Entity not found', entity);
    }
  };

  this.getEntity = function(id) {
    return tracker.find(id);
  };
  
  this.transition = function(trans) {
    states.transition(trans);
  };

  this.input = function(message, args) {
    states.active().on(message, args);
  };
  
  this.queueNext = function(action) {
    nextTickActions.push(action);
  };
  
  function tick() {
    time.update();
    physics.update();
    states.active().tick();
    tracker.forEach(function(entity) {
      if (entity.update) { entity.update(time.delta); }
    });
    renderer.render(stage);
    
    var nextAction = null;
    while (nextAction = nextTickActions.pop()) {
      nextAction.call(this);
    }
  };

  // Go!
  hub.interceptor = this.queueNext;
  states.start();
  ticker.run(tick);

};

module.exports = GameEngine;