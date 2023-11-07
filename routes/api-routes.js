const router = require('express').Router();
const { error } = require('console');
const req = require('express/lib/request');
const res = require('express/lib/response');
const fs= require("fs");
const uniqid=require("uniqid")

router.get("/notes",(req,res)=>{
    fs.readFile("db/db.json","utf-8",(err,data)=>{
        if(err) throw err
        res.json(JSON.parse(data))
    })
})

module.exports=router