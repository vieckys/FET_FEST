let express = require('express');
let connection = require('./../../db');
let vaccinationRouter=express.Router();

async function createVaccinationSchedule(childrenDetil){
    return new Promise((resolve, reject)=>{
        connection.query("SELECT id ,name ,whenToGive FROM `vaccinations` order by whenToGive;", async function(err,rows){
            if(err){
                reject(err);
            }
            if(rows!=null && rows.length>0){
                childrenDetilArry = rows.map((item)=>{
                    return {children_id:childrenDetil.id,vaccin_id:item.id,vaccinName:item.name,date:getDate(childrenDetil.dob,item.whenToGive),done:'N'}
                })
                
                for(let i=0;i<childrenDetilArry.length;i++){
                    await new Promise((res, rej)=>{
                        connection.insert("vaccinations_history",childrenDetilArry[i],function(err,row){
                            if(err){
                                rej(err);
                            }
                            res({message:"vaccinations_history Detail added",status:1,data:row});
                        });
                    }).catch((err)=>{
                        reject(err);
                    });
                }
                resolve(1);
            }else{
                reject("No vaccination found");
            }
        });
        
    });
}
function getDate(dob,days){
    var dt = new Date(dob);
    dt.setDate( dt.getDate() + days);  
    return (dt.getFullYear()+"-"+(dt.getMonth()+1)+"-"+dt.getDate()); 
}
vaccinationRouter.post("/",function(req,res,next){
    if(req.body){
        connection.insert("vaccination_history",req.body,function(err,rows){
            if(err){
                next(err);
            }
            res.send({message:"Vaccination Detail added",status:1,data:rows});
        });
    }else{
        next("No data Found in Body");
    }
});

vaccinationRouter.put("/:id",function(req,res,next){
    if(req.body){
        connection.update("vaccinations_history",req.body,{id:{operator:'=', value:req.body.id}},function(err,rows){
            if(err){
                next(err);
            }
            res.send({message:"Vaccination Detail Updated Successfully",status:1,data:rows});
        });
    }else{
        next("No data Found in Body");
    }
});

vaccinationRouter.post("/:id",function(req,res,next){
    if(req.body){
        connection.query("SELECT  id,children_id,vaccin_id,vaccinName,DATE_FORMAT(date, \"%Y-%m-%d\") as date,done  from vaccinations_history where children_id='"+req.params.id+"' AND user_id='"+req.body.user_id+"'",function(err,rows){
            if(err){
                next(err);
            }
            if(rows!=null && rows.length>0){
                res.send({message:"Vaccination schedule Details",status:1,data:rows});
            }else{
                next("No Vaccination schedule Details available with given children id");
            }
            
        });
    }else{
        next("No data Found in Body");
    }
});
module.exports={
    createVaccinationSchedule:createVaccinationSchedule,
    router:vaccinationRouter
};