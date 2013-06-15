// GET /reactions/simple
exports.simple = function (req, res) {
  res.render('reactions/simple', {title: 'simple reactions'})
}