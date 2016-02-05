var MongoClient = require('mongodb').MongoClient; 
var productSchema = new MongoClient.Schema({  
  id: String,
  classId: String,
  categoryId: String,
  description: String,
  narration: String,
  unitPrice: Number,
  unitPriceDecimal: Number,
  supplierCode: String,
  reorderLevel: String
});

//validate cateogory ID before save
productSchema.pre('save', function (next, req) {
  var category = MongoClient.model('category'); 
  category.findById(req.params.id,function(err,data){
    // This will run Mongo Query to fetch data based on ID.
    if(err) return new Error({error:"Invalid Category ID"});
    else return data;
    });
  
  var classModel = MongoClient.model('class'); 
  classModel.findById(req.params.id,function(err,data){
    // This will run Mongo Query to fetch data based on ID.
    if(err) return new Error({error:"Invalid Class ID"});
    else return data;
    });
    
  });
  
module.exports = MongoClient.model('product', productSchema);