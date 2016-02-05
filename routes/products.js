
var express = require('express'),
    router = express.Router(),
    mongoClient = require('mongodb').mongoClient,  //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'),
    productOp = require("./model/product");
    

router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

//build the REST operations at the base for products
router.route('/products')
    //GET all products
    .get(function(req, res) {
        //retrieve all products from Mongo
        var response = {};
        productOp.find({}, function (err, data) {
              if (err) {
                  response = {"err":true, "message":"error fetching the data."};
              } else {
                  response = {"err":false, "message": data}
              }  
              res.json(response);
        });
    })
    
    //POST a new product
    .post(function(req, res) {
        // Get values from POST request.
        var id = req.body.id;
        var classId = req.body.classId;
        var categoryid = req.body.categoryId;
        var description = req.body.description;
        var narration = req.body.narration;
        var unitPrice = req.body.unitPrice;
        var unitPriceDecimal = req.body.unitPriceDecimal;
        var supplierCode = req.body.supplierCode;
        var reorderLevel= req.body.reorderLevel;
        var response = {};
        var db = new productOp;
        
        //call the create function to the database
         db.create({
            id: id,
            classId: classId,
            categoryId: categoryid,
            description: description,
            narration: narration,
            description: description,
            narration: narration,
            unitPrice: unitPrice,
            unitPriceDecimal: unitPriceDecimal,
            supplierCode: supplierCode,
            reorderLevel: reorderLevel
        }, function (err) {
            if(err) {
                response = {"error": true,"message": "Error adding data"};
            } else {
                response = {"error": false,"message": "Data added"};
            }
            res.json(response);
        })
    });
    
    //GET a product by Id
    router.route("/products/:id")
    .get(function(req,res){
        var response = {};
        productOp.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    
    //UPDATE a product by Id
    .put(function(req,res){
        var response = {};
        // first find out record exists or not
        // if it does then update the record
        productOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.categoryId !== undefined) {
                    // case where password needs to be updated
                    data.categoryId = req.body.categoryId;
                }
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
    
    //DELETE a product by Id
    .delete(function(req,res){
        var response = {};
        // find the data
        productOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                productOp.remove({_id : req.params.id},function(err){
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