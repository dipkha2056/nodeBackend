const express = require('express');
const router = express.Router();
const Accountant = require('../models/AccountantModel');
const auth = require('../midddleware/adminAuth')
const upload = require('../midddleware/upload')
const {check, validationResult} = require('express-validator')

router.post('/accountant/insert',upload.single('image'),function(req,res){

    console.log(req.file)
    if(req.file == undefined){
        return res.status(400).json({message : "invalid file format!!"})
    }

    const name = req.body.name
    const email = req.body.email
    const cost = req.body.cost
    const qualification = req.body.qualification
    const experience = req.body.experience
    const number = req.body.number
    const description = req.body.description

    const accountant =new Accountant({
        name : name, 
        email : email, 
        cost : cost,
        qualification : qualification, 
        experience : experience,
        image: req.file.filename, 
        number : number , 
        description : description
    })
    accountant.save()
    .then(function(result){
        res.status(201).
        json({message : "Accountant Added !!"})

    })
    .catch(function(err){
        res.status(500).json({message:err})
        
    })

})

router.put('/accountant/update',function(req,res){
    const id = req.body.id
    const name = req.body.name
    const email = req.body.email
    const cost = req.body.cost
    const qualification = req.body.qualification
    const experience = req.body.experience
    const number = req.body.number
    const description = req.body.description

    Accountant.updateOne({_id:id},{name:name,email:email,cost:cost,qualification:qualification,experience:experience,number:number,description:description})
    .then(function(result){
        res.status(200).json({message: "updated!!"})
    }).catch(function(err){
        res.status(500).json({message:err})
    })
})

router.delete('/accountant/delete/:aid',function(req,res){
    const aid = req.params.aid
    Accountant.deleteOne({_id : aid}).then(function(result){
        res.status(200).json({message : "deleted"})
    }).catch(function(err){
        res.status(500).json({message : err})
    })
})

router.get('/accountant/all',function(req,res){
    Accountant.find()
    .then(function(data){
        res.status(200).json({success: true, data: data})
        console.log(data)
    }).catch(function(e){
        res.status(500).json({success: false, e})
    })
})

router.get('/accountant/sigle/:id',function(req,res){
    const id = req.params.id;
    Accountant.findOne({_id:id})
    .then(function(data){
        res.status(200).json(data)
    }).catch(function(e){
        res.status(500).json({err:e})
    })
})


module.exports = router