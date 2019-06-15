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
            res.send({message:"Children detail added",status:1,data:rows});
            req.body.id=rows.insertId;
            await vaccination.createVaccinationSchedule(req.body).then((data)=>{
                console.log("Vaccination schedule created");
            }).catch((err)=>{
                next(err);
            });

        });
    }else{
        next("No data found in body");
    }
});

childRouter.put("/",function(req,res,next){
    if(req.body){
        connection.update("children",req.body,{id:{operator:'=', value:req.body.id},user_id:{operator:'=', value:req.body.user_id}},function(err,rows){
            if(err){
                next(err);
            }
            res.send({message:"Children detail updated successfully",status:1,data:rows});
        });
    }else{
        next("No data found in body");
    }
});

childRouter.delete("/:id",function(req,res,next){
    if(req.body){
        connection.delete("children",req.body,{id:{operator:'=', value:req.body.id}},function(err,rows){
            if(err){
                next(err);
            }
            res.send({message:"Children detail deleted successfully",status:1,data:rows});
        });
    }else{
        next("No data found in body");
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
           return next(err);
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
                        reject("No vaccinations_history available for children");
                    }
                    
                });
            }).catch((err)=>{
                return next(err);
            });
        }
        res.send({message:"Children details",status:1,data:data});
    }else{
        next("No data found in body");
    }
});

childRouter.post("/:id",function(req,res,next){
    if(req.body){
        connection.query("SELECT id,name,DATE_FORMAT(dob, \"%Y-%m-%d\") as dob,gender,comments,height,weight,user_id from children where id='"+req.body.id+"' AND user_id='"+req.body.user_id+"'",function(err,rows){
            if(err){
                return next(err);
            }
            if(rows!=null && rows.length>0){
                res.send({message:"Children details",status:1,data:rows});
            }else{
                next("No children available with given id");
            }
        });
    }else{
        return next("No data found in body");
    }
});
module.exports=childRouter;