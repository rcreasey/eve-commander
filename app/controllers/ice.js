// GET /ice/profit
exports.profit = function (req, res) {
  res.render('ice/profit', {title: 'Ice Yield By Profit'})
}

// GET /ice/volume
exports.volume = function (req, res) {
  res.render('ice/volume', {title: 'Ice Yield By Volume'})
}

// GET /ice
// GET /ice/refine
exports.refine = function (req, res) {
  res.render('ice/refine', {title: 'Ice Refines'})
}
