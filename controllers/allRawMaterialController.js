const allRawMaterialModel = require('../models/allRawMaterials');
const { validationResult } = require('express-validator'); 
const productmaterialModel = require('../models/productrawmaterial');

exports.getAllmaterials = (param, callback) =>{
    allRawMaterialModel.getAll(param, (err, materials) => {
    if (err) throw err;
    const materialsObj = [];
    materials.forEach(function(doc) {
        materialsObj.push(doc.toObject());
    });
    callback(materialsObj);
  });
};

exports.addMaterial = (req,res)=>{
  var product = {
    name: req.body.name,
    stock: "0",
    UOM: req.body.UOM,
    costperUnit: req.body.costperUnit
  }
  
  allRawMaterialModel.saveMaterial(product, function (err, result) {
    if(err){
      console.log(err);
      res.redirect('/rawmaterials');
    }
    else{
      console.log(result);
      res.redirect('/rawmaterials')
    }
  })
};
exports.delete = (req,res)=>{
  var id = req.body.rawID;
  allRawMaterialModel.remove(id, (err, result) => {
    if (err) {
      throw err; 
    } 
    else {
      console.log(result);
      var query = result._id;
      console.log("THIS IS THE QUERY: " + query);
      productmaterialModel.removeDeletedMaterial( query , (err2, deleted) =>{
        console.log(deleted)
        res.redirect('/rawmaterials');
      });
    }
  }); 
};

exports.update = (req,res) =>{
  console.log(req.body.productionorderID);

  
  
}