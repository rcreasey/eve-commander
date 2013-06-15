var express = require('express')
  , env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]

var app = express()

// Bootstrap application settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app)

// Start the app by listening on <port>
var port = process.env.PORT || 3000
app.listen(port)
console.log('Express app started on port '+port)
