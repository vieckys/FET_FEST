let express = require('express');
let connection = require('./../../db');
let vaccination = require('../vaccination/vaccination');

let childRouter=express.Router();

childRouter.post("/",function(req,res,next){
    if(req.body){
        connection.insert("children",req.body,async function(err,rows){
            if(err){
                next(err);
            }
            res.send({message:"Children Detail added",status:1,data:rows});
            req.body.id=rows.insertId;
            await vaccination.createVaccinationSchedule(req.body).then((data)=>{
                console.log("Vaccination Schedule created");
            }).catch((err)=>{
                next(err);
            });

        });
    }else{
        next("No data Found in Body");
    }
});

childRouter.put("/:id",function(req,res,next){
    if(req.body){
        connection.update("children",req.body,{id:{operator:'=', value:req.body.id},user_id:{operator:'=', value:req.body.user_id}},function(err,rows){
            if(err){
                next(err);
            }
            res.send({message:"Children Detail Updated Successfully",status:1,data:rows});
        });
    }else{
        next("No data Found in Body");
    }
});

childRouter.delete("/:id",function(req,res,next){
    if(req.body){
        connection.delete("children",req.body,{id:{operator:'=', value:req.body.id}},function(err,rows){
            if(err){
                next(err);
            }
            res.send({message:"Children Detail Deleted Successfully",status:1,data:rows});
        });
    }else{
        next("No data Found in Body");
    }
});

childRouter.post("/byUser/:id",async function(req,res,next){
    if(req.body){
        let data=await new Promise((resolve, reject)=>{
            connection.query("SELECT id,name,DATE_FORMAT(dob, \"%Y-%m-%d\") as dob,gender,comments,height,weight,user_id from children where user_id='"+req.body.id+"'",function(err,rows){
                if(err){
                    reject(err);
                }
                if(rows!=null && rows.length>0){
                    resolve(rows);
                }else{
                    reject("No children available for user");
                }
                
            });
        }).catch((err)=>{
            next(err);
        });
        for(let i=0;i<data.length;i++){

            data[i].vaccination=await new Promise((resolve, reject)=>{
                connection.query("SELECT id,	children_id,vaccin_id,vaccinName,DATE_FORMAT(date, \"%Y-%m-%d\") as date,done from vaccinations_history where children_id='"+data[i].id+"' and (done='n' or done='N') and date>now() order by id limit 1",function(err,rows){
                    if(err){
                        reject(err);
                    }
                    if(rows!=null && rows.length>0){
                        resolve(rows);
                    }else{
                        reject("No children available for user");
                    }
                    
                });
            }).catch((err)=>{
                next(err);
            });
        }
        res.send({message:"Children Details",status:1,data:data});
    }else{
        next("No data Found in Body");
    }
});

childRouter.post("/:id",function(req,res,next){
    if(req.body){
        connection.query("SELECT id,name,DATE_FORMAT(dob, \"%Y-%m-%d\") as dob,gender,comments,height,weight,user_id from children where id='"+req.body.id+"' AND user_id='"+req.body.user_id+"'",function(err,rows){
            if(err){
                next(err);
            }
            if(rows!=null && rows.length>0){
                res.send({message:"Children Details",status:1,data:rows});
            }else{
                next("No children available with given id");
            }
        });
    }else{
        next("No data Found in Body");
    }
});
module.exports=childRouter;