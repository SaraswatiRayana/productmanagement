
var express = require('express'),
    router = express.Router(),
    mongoClient = require('mongodb').mongoClient,  //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'),
    categoryOp = require("./model/category");
    

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

//build the REST operations at the base for categories
router.route('/categories')
    //GET all categories
    .get(function(req, res) {
        //retrieve all categories from Mongo
        var response = {};
        categoryOp.find({}, function (err, data) {
              if (err) {
                  response = {"err":true, "message":"error fetching the data."};
              } else {
                  response = {"err":false, "message": data}
              }  
              res.json(response);
        });
    })
    
    //POST a new category
    .post(function(req, res) {
        // Get values from POST request.
        var id = req.body.id;
        var description = req.body.description;
        var narration = req.body.narration;
        var response = {};
        var db = new categoryOp;
        
        //call the save function to the database
         db.save({
            id : id,
            description : description,
            narration : narration
        }, function (err) {
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        })
    });
    
    //GET a category by Id
    router.route("/categories/:id")
    .get(function(req,res){
        var response = {};
        categoryOp.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    
    //UPDATE a category by Id
    .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        categoryOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.description !== undefined) {
                    // case where description needs to be updated.
                    data.description = req.body.description;
                }
                if(req.body.narration !== undefined) {
                    // case where password needs to be updated
                    data.narration = req.body.narration;
                }
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    
                    res.json(response);
                })
            }
        });
    })
    
    //DELETE a category by Id
    .delete(function(req,res){
        var response = {};
        // find the data
        categoryOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                categoryOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })
    
    express.use('/',router);