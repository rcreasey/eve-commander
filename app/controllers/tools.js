// GET /tools/foreman
exports.foreman = function (req, res) {
  res.render('tools/foreman', {title: 'Mining Operations Foreman'})
}

// GET /tools/appraisal
exports.appraisal = function (req, res) {
  res.render('tools/appraisal', {title: 'Inventory Appraisal'})
}

// POST /tools/appraisal
exports.appraise = function (req, res) {
  console.log("Data: %j", req.body.inventory)
  res.render('tools/appraise', {title: 'Inventory Appraisal', inventory: req.body.inventory})
}
