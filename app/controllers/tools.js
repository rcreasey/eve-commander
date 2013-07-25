var PEG = require("pegjs")

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
    , parser = PEG.buildParser( inventory_peg )
    , types = require('../../public/data/types.json')
    , ice_data = require('../../public/data/ice.json')
    , ore_data = require('../../public/data/ores.json')

  function findByName(source, name) {
    return source.filter(function( obj ) {
        return obj.name === name;
    })[ 0 ];
  }

  function findRefines(item, to_refine, data) {
    refines = []
    for (var j = 0; j < to_refine.by_volume.length; j++) {
      if ( to_refine.by_volume[j] ) {
        product = types[ data.component_index[j].toLowerCase() ]
        refines.push({"id": product.typeID, 
                    "name": product.name, 
                    "quantity": parseFloat( (to_refine.by_volume[j] * item.volume).toFixed(2) ), 
                    "volume": parseFloat( (product.volume * item.volume).toFixed(2) ),
                    "refine": true,
                    "parent": item.name})
      }
    }

    return refines
  }

  var parsed_items = []
  if (req.body.inventory) {
    parsed_items = parser.parse( req.body.inventory.replace(/,/g,'') );
  }

  var inventory = []
  parsed_items.map(function(item) {
    i = types[item.name.toLowerCase()]

    ice_refine = findByName( ice_data.ices, i.name )
    ore_refine = findByName( ore_data.ores, i.name )

    if (ice_refine) {
      ice_refines = findRefines(item, ice_refine, ice_data)
      for (var i in ice_refines ) {
        inventory.push( ice_refines[i] )
      }

    } else if (ore_refine) {
      ore_refines = findRefines(item, ore_refine, ore_data)
      for (var i in ore_refines) {
        inventory.push( ore_refines[i] )
      }

    } else {
      inventory.push({"id": i.typeID, "name": i.name, "quantity": item.quantity, "volume": item.volume})
    }

  })

  res.render('tools/appraise', {title: 'Inventory Appraisal', inventory: inventory})
}