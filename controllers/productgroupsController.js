const productgroupsModel = require('../models/productgroups');
const { validationResult } = require('express-validator');

exports.getAllpg = (param, callback) =>{
    productgroupsModel.getAll(param, (err, posts) => {
      if (err) throw err;
      const pgObjects = [];
      posts.forEach(function(doc) {
        pgObjects.push(doc.toObject());
      });
      callback(pgObjects);
    });
  };

  exports.getID = (req, res) => {
    var id = req.params.id;
  
    productgroupsModel.getByID(id, (err, result) => {
      if (err) {
        throw err;
      } else {
        var pgObject = result.toObject();
        res(pgObject);
      }
    });
  };