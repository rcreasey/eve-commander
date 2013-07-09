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

  // tools
  var tools = require('../app/controllers/tools')
  app.get('/tools/foreman', tools.foreman)

  // root
  var root = require('../app/controllers/root')
  app.get('/', root.index)
}