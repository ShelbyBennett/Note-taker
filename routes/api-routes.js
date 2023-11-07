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

router.post("/notes",(req,res)=>{
    const notesDb=JSON.parse(fs.readFileSync("db/db.json"))
    const newNote=req.body
    newNote.id=uniqid()
    notesDb.push(newNote)
    fs.writeFileSync("db/db.json",JSON.stringify(notesDb))
    res.json(notesDb)
})

router.delete("/notes/:id",(req,res)=>{
    const notesDb=JSON.parse(fs.readFileSync("db/db.json"))  
    const removeNote=notesDb.filter((note)=>(note.id !==req.params.id)) 
    fs.writeFileSync("db/db.json",JSON.stringify(removeNote))
    res.json(removeNote)
})


module.exports=router