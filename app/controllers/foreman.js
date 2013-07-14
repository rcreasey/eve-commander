// GET /foreman
exports.index = function (req, res) {
  res.render('foreman/index', {title: 'Mining Operations Foreman'})
}
