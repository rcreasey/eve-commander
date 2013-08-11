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
    refines = new Object();
    for (var j = 0; j < to_refine.by_volume.length; j++) {
      if ( to_refine.by_volume[j] ) {
        var product = types[ data.component_index[j].toLowerCase() ];
        var quantity = parseFloat( (to_refine.by_volume[j] * item.volume).toFixed(2) );
        refines[product.name] = {"id": product.typeID, 
                    "name": product.name, 
                    "quantity": quantity, 
                    "volume": product.volume * quantity,
                    "refine": true,
                    "parent": [item.name]};
      }
    }

    return refines;
  }

  function upsert(collection, item) {
    if (item.name in collection) {
      collection[ item.name ].quantity += item.quantity;
      if (item.parent) {
        collection[ item.name ].parent = collection[ item.name ].parent.concat(item.parent);
      }
    } else {
      collection[ item.name ] = item;
    }
  }
  
  var parsed_items = new Array();
  var unparsed  = new Array()
  if (req.body.inventory) {
    var lines = req.body.inventory.split("\r\n");
    for (line in lines) {
      try {
        parsed_items.push(parser.parse( lines[line] )[0]);
      } catch(e) {
        unparsed.push({"error": e, "line": lines[line] });
      }
    }
  }

  var inventory = new Object();
  parsed_items.map(function(item) {
    if (! item.unparsed ) {
      try {
        var i = types[item.name.toLowerCase()];

        ice_refine = findByName( ice_data.ices, i.name );
        ore_refine = findByName( ore_data.ores, i.name );

        if (ice_refine) {
          ice_refines = findRefines(item, ice_refine, ice_data);
          for (var i in ice_refines ) {
            upsert(inventory, ice_refines[i]);
          }

        } else if (ore_refine) {
          ore_refines = findRefines(item, ore_refine, ore_data);
          for (var i in ore_refines) {
            upsert(inventory, ore_refines[i]);
          }

        } else {
          upsert(inventory, {"id": i.typeID, "name": i.name, "quantity": item.quantity, "volume": i.volume * item.quantity});
        }
      } catch (e) {
        unparsed.push({"error": e, "item": item});
      }
    }
  });

  res.render('tools/appraise', {title: 'Inventory Appraisal', inventory: inventory, unparsed: unparsed, parsed_items: parsed_items});
}