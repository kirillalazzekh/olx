var express = require('express');
var router = express.Router();
var adsmodels = require('../models/adsSchema');


router.get('/getsuggestions',(req,res)=>{
   
    adsmodels.find({},'title tag -_id',(err,data)=>{
        if(err){
            res.status(500).json("error has been occored!")
        }
        else{
            let suggestions = [];
            data.forEach((item)=>{
                suggestions.push({label:item.title});
                suggestions.push({label:item.tag});
            });
            res.status(200).json(suggestions);
        }
    });
     
})


router.get('/getads',(req,res)=>{
    if(req.query.category === 'all'){
        adsmodels.find({},(err,data)=>{
            if(err){
                res.status(500).json("error has been occored!")
            }
            else{
                res.status(200).json(data);
            }
    });}
    else{
    adsmodels.find({"category":req.query.category},(err,data)=>{
        if(err){
            res.status(500).json("error has been occored!")
        }
        else{
            res.status(200).json(data);
        }
    });}
     
})

router.get('/getuserads',(req,res)=>{
    
    adsmodels.find({"user":req.query.id},(err,data)=>{
        if(err){
            res.status(500).json("error has been occored!")
        }
        else{
            res.status(200).json(data);
        }
    });
     
});


module.exports = router;