var async = require('async')

module.exports = function (app, auth) {

  // reactions
  var reactions = require('../app/controllers/reactions')
  app.get('/reactions/simple', reactions.simple)

  // root
  var root = require('../app/controllers/root')
  app.get('/', root.index)
}