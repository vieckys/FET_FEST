let express = require('express');
let connection = require('./../../db');
let userRouter=express.Router();

userRouter.post("/signup",function(req,res,next){
    if(req.body){
        connection.insert("user",req.body,function(err,rows){
            if(err){
                if(err.sqlMessage.indexOf("Duplicat")!=-1){
                    next("Email Id already exist");
                }else{
                    next(err);
                }
            }
            res.send({message:"Signup Successfully",status:1,data:rows});
        });
    }else{
        next("No data Found in Body");
    }
});

userRouter.post("/signin",function(req,res,next){
    if(req.body){
        connection.query("SELECT * from user where email='"+req.body.email+"' and password='"+req.body.password+"'",function(err,rows){
            if(err){
                    next(err);
            }
            if(rows!=null && rows.length>0){
                res.send({message:"Signup Successfully",status:1,data:rows});
            }else{
                next("password or email invalid");
            }
            
        });
    }else{
        next("No data Found in Body");
    }
});
module.exports=userRouter;