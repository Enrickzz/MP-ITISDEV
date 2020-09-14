const router = require('express').Router();
const userController = require('../controllers/userController');
const productgroupsController = require('../controllers/productgroupsController');
const productconnectionController = require('../controllers/productconnectionController');
const productController = require('../controllers/productController');
const productrawmaterialController = require('../controllers/productrawmaterialController');
const allRawMaterialController = require('../controllers/allRawMaterialController');

const { registerValidation, loginValidation } = require('../validators.js');
const { isPublic, isPrivate } = require('../middlewares/checkAuth');


router.get('/home', isPrivate, function(req, res) {
  // The render function takes the template filename (no extension - that's what the config is for!)
  // and an object for what's needed in that template
  res.render('home', {
    layout: 'main',
    title: 'Dashboard'
  })
});

router.get('/productgroup', isPrivate, function(req, res) {
  // The render function takes the template filename (no extension - that's what the config is for!)
  // and an object for what's needed in that template
  productgroupsController.getAllpg(req, (productgroups) => { //make productmodel function to return ungrouped products
    res.render('productgroup', {  
      layout: 'main',
      title: 'Product Groups',
      pglist: productgroups
    })
  });
});

router.get('/productgroup/view/:id', (req, res) => {
  console.log("Read view successful!");
  
  productgroupsController.getID(req, (productGroup) => {
    var query = productGroup._id; // this is the connection of products to its group
    productController.getGroupProducts(query,(pgproducts)=>{
      console.log("LIST OF CONNECTIONS : ");
      console.log(pgproducts); 
      res.render('productgroup-card', { 
        layout:'main',
        title:"Product Groups",
        pgroup: productGroup,
        plist: pgproducts
      });
    })
  });
});

router.get('/allproducts', isPrivate, function(req, res) {
  // The render function takes the template filename (no extension - that's what the config is for!)
  // and an object for what's needed in that template
  productController.getAllproducts(req, (products) => {
    productgroupsController.getAllpg(req,(productgroups) =>{
      res.render('products', { 
        layout: 'main',
        title: 'Products List',
        plist: products,
        pglist: productgroups
      })
    })
  });
});

router.get('/rawmaterials', isPrivate, function(req, res) {
  // The render function takes the template filename (no extension - that's what the config is for!)
  // and an object for what's needed in that template
  allRawMaterialController.getAllmaterials(req, (allmaterials) =>{
    res.render('raw-materials', {
      layout: 'main',
      title: 'Raw Materials',
      rawList: allmaterials
    });
  });
});


router.get('/product/view/:id', (req, res) => {
  console.log("Read view successful!");
   
  productController.getID(req, (prod) => {
    var query = prod._id;
    productrawmaterialController.getRawMaterials(query,(materials) => {
      allRawMaterialController.getAllmaterials(req,(allMaterials) => {
        res.render('product-card', { 
          layout:'main',
          title: prod.name,
          product: prod,
          rawList: materials,
          allMat: allMaterials
        });
      });
    })
  });
});



router.get('/manageusers', isPrivate, function(req, res) {
  // The render function takes the template filename (no extension - that's what the config is for!)
  // and an object for what's needed in that template
  res.render('manageusers', {
    layout: 'main',
    title: 'Manage Users'
  })
});

router.get('/productgroupcard', isPrivate, function(req, res) {
  // The render function takes the template filename (no extension - that's what the config is for!)
  // and an object for what's needed in that template
  res.render('productgroup-card', {
    layout: 'main',
    title: '{{ Product Group }}'
  })
});

router.get('/productcard', isPrivate, function(req, res) {
  // The render function takes the template filename (no extension - that's what the config is for!)
  // and an object for what's needed in that template
  res.render('product-card', {
    layout: 'main',
    title: '{{ Product name}}'
  })
});

router.get('/profile', isPrivate, function(req, res) {
  // The render function takes the template filename (no extension - that's what the config is for!)
  // and an object for what's needed in that template
  res.render('profile', {
    layout: 'main',
    title: 'My Profile'
  })
});


router.post('/addProduct' , productController.addProduct);
router.post('/addMaterial', allRawMaterialController.addMaterial);
router.post('/productNewMaterial', productrawmaterialController.addMaterial);


module.exports = router;