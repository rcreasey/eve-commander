var PEG = require("pegjs");

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
  var inventory_peg = require('../helpers/inventory.peg')
  var mock_inventory = require('../../public/data/inventory.json')
  var parser = PEG.buildParser( inventory_peg );
  inventory_items = parser.parse(req.body.inventory.replace(/,/g,''));
  res.render('tools/appraise', {title: 'Inventory Appraisal', inventory: inventory_items})
}
