var MongoClient = require('mongodb').MongoClient; 
var categorySchema = new MongoClient.Schema({  
  id: String,
  description: String,
  narration: String
});

    
module.exports = MongoClient.model('product', categorySchema);