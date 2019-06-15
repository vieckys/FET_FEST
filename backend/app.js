let express = require('express');
let bodyParser = require('body-parser');
let v1 = require('./v1/v1');

let app=express();
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token");
    res.setHeader("Access-Control-Allow-Methods", "DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT");
    next();
});
app.use(bodyParser.json());
app.use("/v1",v1);


function errorHandler (err, req, res, next) {
       res.status(500).send({ status:0,message: typeof err=="object"?err.sqlMessage:err,data:null });
 }

app.use(errorHandler);

module.exports=app;