var _               = require('../../../3rdparty/underscore-min');
var GraphicsEngine  = require('./graphics-engine');
var PhysicsEngine   = require('./physics-engine');
var SoundEngine     = require('./sound-engine');
var ParticleEngine  = require('./particle-engine');
var ticker          = require('./ticker');
var EntityTracker   = require('./entitytracker');
var Time            = require('./time');
var hub             = require('./hub');


function Engine(world, mainView, debugView) {
  
  this.nextTickActions  = [];
  
  this.graphics     = new GraphicsEngine(world, mainView, debugView);
  this.physics      = new PhysicsEngine(debugView);
  this.sound        = new SoundEngine();
  this.particles    = new ParticleEngine(this);
  this.tracker      = new EntityTracker();
  this.time         = new Time();
  
  // No game attached yet
  this.game = null;
    
  this.physics.collision(function(fixtureA, fixtureB, points) {
    var entityA = fixtureA.GetUserData();
    var entityB = fixtureB.GetUserData();
    if (entityA && entityB) {
      entityA.collision(entityB, points);
      entityB.collision(entityA, points);      
    }
  });
   
  hub.interceptor = _.bind(this.queueNext, this);
  
  hub.on('entity:destroy', function(params) {
    this.deleteEntity(params.entity.id)
  }.bind(this));
  
};

Engine.prototype.start = function() {
  ticker.run(_.bind(this.update, this));
};

Engine.prototype.stop = function() {
  ticker.stop();
};

Engine.prototype.update = function() {
  var that = this;
  this.time.update();
  this.physics.update();
  this.tracker.forEach(function(entity) {
    if (entity.update) {
      entity.update(that, that.game, that.time.delta);
    }
  });
  if (this.game) {
    this.game.update(this, this.time.delta);
  }
  this.graphics.render();
  
  var nextAction = null;
  while (nextAction = this.nextTickActions.pop()) {
    nextAction.call(this);
  }
};

Engine.prototype.queueNext = function(action) {
  this.nextTickActions.push(action);
};


Engine.prototype.forget = function(entity) {
  this.tracker.forget(entity);
};

Engine.prototype.addEntity = function(entity) {
  if (entity.id) {
    this.tracker.track(entity);
    if (entity.create) {
      entity.create(this, this.game);
    }
  } else {
    console.log('Entity should have an ID', entity);
  }
};

Engine.prototype.deleteEntity = function(id) {
  var entity = this.tracker.find(id);
  if (entity) {
    if (entity.destroy) {
      entity.destroy(this, this.game);
    }
    this.tracker.forget(entity);
  } else {
    console.log('Entity not found', entity);
  }
};

Engine.prototype.getEntity = function(id) {
  return this.tracker.find(id);
};

Engine.prototype.attach = function(game) {
  this.game = game;
};

Engine.prototype.detach = function() {
  this.game = null;
};

module.exports = Engine;
