// GET /tools/foreman
exports.foreman = function (req, res) {
  res.render('tools/foreman', {title: 'Mining Operations Foreman'})
}
