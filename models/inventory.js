const mongoose = require('./connection');

const inventorySchema = new mongoose.Schema({
    branch_id: { type: String, required: true },
    inventorydate: { type: String, required: true },
    product: { type: String, required: true },
    startInv: { type: String, required:false, default:"0"},
    restockQuantity: { type: String, required:false, default:"0"},
    restockedInventory: { type: Number, required:false, default:"0"},
    midDayCount: { type: Number, required:false, default:"0"},
    midDaySales: { type: Number, required:false, default:"0"},
    additionalRestock: { type: Number, required: false , default:"0"},
    pulloutStock: { type: Number, required:false, default:"0"},
    runningInventory: { type: Number, required:false, default:"0"},
    endDayCount: { type: Number, required:false, default:0},
    endDaySales: { type: String, required:false, default:"0"},
    returns: { type: Number, required:false, default:"0"},
    totsales:{type:Number, required:false, default:"0"},
    srp:{type:String, required:true}
  }
);

const inventoryModel = mongoose.model('inventory', inventorySchema, 'inventory');

exports.getAll = (param, next) => {
    inventoryModel.find({}, (err, inventory) => {
      next(err, inventory);
    });
  };

exports.fetchList = function(query, next) {
    inventoryModel.find(query, function(err, orders) {
      next(err, orders);
    });
  };

exports.update = function(query, update, next) {
  inventoryModel.findOneAndUpdate(query, update, { new: true }, function(err, res) {
    next(err, res);
  })
};
exports.updateFind = function(query, update, next) {
  inventoryModel.findOneAndUpdate(query, update, function(err, done) {
    next(err, done);
  })
};
exports.findone = function(query, next){
  inventoryModel.findOne(query, (err,res)=>{
    next(err,res);
  })
}

exports.create = function(obj, next) {
  const inv = new inventoryModel(obj);
  inv.save(function(err, inv_result) {
    next(err, inv_result);
  });
};