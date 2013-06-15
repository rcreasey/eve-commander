// GET /reactions/simple
exports.simple = function (req, res) {
  var reactions = require('../public/data/reactions-simple')
  res.render('reactions/simple', {title: 'simple reactions', reactions: reactions})
}