var async = require('async')

module.exports = function (app, auth) {

  // reactions
  var reactions = require('../app/controllers/reactions')
  app.get('/reactions/simple', reactions.simple)
  app.get('/reactions/alchemy', reactions.alchemy)
  app.get('/reactions/complex', reactions.complex)

  // ore
  var ore = require('../app/controllers/ore')
  app.get('/ore/profit', ore.profit)
  app.get('/ore/volume', ore.volume)
  app.get('/ore/refine', ore.refine)
  app.get('/ore', ore.refine)

  // ice
  var ice = require('../app/controllers/ice')
  app.get('/ice/profit', ice.profit)
  app.get('/ice/volume', ice.volume)
  app.get('/ice/refine', ice.refine)
  app.get('/ice', ice.refine)

  // foreman
  var foreman = require('../app/controllers/foreman')
  app.get('/foreman', foreman.index)

  // root
  var root = require('../app/controllers/root')
  app.get('/', root.index)
}