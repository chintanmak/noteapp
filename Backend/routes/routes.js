const { response } = require('express')
const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')


router.post('/signup', async(request, response)=>{
    console.log(request.body)
    try{

        const signedUpUser = await new signUpTemplateCopy({
            note:request.body.note,
            //request.body.phone
        })
        signedUpUser.save()
        .then(data =>{
            response.json(data)
        })
        .catch(error =>{
            response.json(error)
        })
    }catch(err){
        console.log(err);
    }

})

router.get('/get-data/:note', async(req,res)=>{

    try{

        await signUpTemplateCopy.findOne({
            note:req.params.note
        }).then(data=>{
            res.json(data)
        }).catch(err=>res.json(err));
        
    }catch(err){
        console.log(err);
    }
})

router.get('/get-all-data', async(req,res)=>{

    try{

        await signUpTemplateCopy.find()
        .then(data=>{
            res.json(data)
            
        }).catch(err=>res.json(err));
        
    }catch(err){
        console.log(err);
    }
})


// router.post('/update-mail/:note', async(req,res)=>{

//     try{

//         const data = await signUpTemplateCopy.findOneAndUpdate({
//             note:req.params.note
//         },{
//             $set:{
//                 email:'gvnxyz@mail.com'
//             }
//         });

//         if(data){
//             res.sendStatus(200);
//         }
//         res.sendStatus(404);
        
//     }catch(err){
//         console.log(err);
//         res.sendStatus(404);
//     }

//     // {
//     //     "_id": "61e7e2e4e8a037eebf3702d9",
//     //     "fullName": "govind",
//     //     "email": "smartk@hack.com",
//     //     "phone": "987654321",
//     //     "date": "2022-01-19T10:07:32.457Z",
//     //     "__v": 0
//     //   },
// })


router.post('/delete-data/:note', async(req,res)=>{

    try{

        const data = await signUpTemplateCopy.findOneAndDelete({
            note:req.params.note
        });

        if(data){
            res.json(data);
        }
        res.sendStatus(404);
        
    }catch(err){
        console.log(err);
        res.sendStatus(404);
    }


})
// router.get('/signin')
module.exports = router