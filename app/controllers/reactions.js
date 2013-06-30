// GET /reactions/simple
exports.simple = function (req, res) {
  res.render('reactions/simple', {title: 'Simple Reactions'})
}
// GET /reactions/alchemy
exports.alchemy = function (req, res) {
  res.render('reactions/alchemy', {title: 'Alchemy Reactions'})
}
// GET /reactions/complex
exports.complex = function (req, res) {
  res.render('reactions/complex', {title: 'Complex Reactions'})
}
