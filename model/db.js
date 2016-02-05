var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb://"+process.env.IP+":27017/data/productmanagementdb", function(err, db) {
  if(err) {
    return console.dir(err);
  }
});