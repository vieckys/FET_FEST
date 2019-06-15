let express = require('express');
let user = require('./user/user');
let children = require('./children/children');
let vaccination = require('./vaccination/vaccination');
let v1Route=express.Router();

v1Route.use("/user",user);
v1Route.use("/children",children);
v1Route.use("/vaccination",vaccination.router);

module.exports=v1Route;