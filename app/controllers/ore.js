// GET /mining/profit
exports.profit = function (req, res) {
  res.render('ore/profit', {title: 'Ore Yield By Profit'})
}

// GET /mining/volume
exports.volume = function (req, res) {
  res.render('ore/volume', {title: 'Ore Yield By Volume'})
}

// GET /mining
// GET /mining/refine
exports.refine = function (req, res) {
  res.render('ore/refine', {title: 'Mineral Refines By Ore'})
}
