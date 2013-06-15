var async = require('async')

module.exports = function (app, auth) {

  // root
  var root = require('../app/controllers/root')
  app.get('/', root.index)
}