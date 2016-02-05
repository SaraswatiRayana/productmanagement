var MongoClient = require('mongodb').MongoClient; 
var classSchema = new MongoClient.Schema({  
  id: String,
  categoryId: String,
  description: String,
  narration: String
});

//validate cateogory ID before save
classSchema.pre('save', function (next, req) {
  var category = MongoClient.model('category'); 
  category.findById(req.params.id,function(err,data){
    // This will run Mongo Query to fetch data based on ID.
    if(err) return new Error({error:"Invalid Category ID"});
    else return data;
    });
  });
    
module.exports = MongoClient.model('product', classSchema);