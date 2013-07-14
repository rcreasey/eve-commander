// GET /ore/profit
exports.profit = function (req, res) {
  res.render('ore/profit', {title: 'Ore Yield By Profit'})
}

// GET /ore/volume
exports.volume = function (req, res) {
  res.render('ore/volume', {title: 'Ore Yield By Volume'})
}

// GET /ore
// GET /ore/refine
exports.refine = function (req, res) {
  res.render('ore/refine', {title: 'Ore Refines'})
}
