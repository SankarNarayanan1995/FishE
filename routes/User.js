const UserModel = require('../models/User');
const mongoose  = require('mongoose');
const express =  require('express');
const router = express.Router();
const bcrypt =  require('bcrypt');
router.post(
    "/login",(req,res) => {
        const formdata = {
            email: req.body.email,
            password: req.body.password
        }
       
        console.log("about to search");
        UserModel.findOne({email:formdata.email},(err,doc) => {
            if(err){
                console.log(err);
            }
            else
            {
                if(doc)
                {
                  
                   bcrypt.hash(formdata.password,doc.salt,(err,hashPassword) => {
                   if(hashPassword == doc.password)
                   {
                    console.log(doc._id);   
                    res.send("You have been authenticated");
                   }
                   else
                   {
                       res.send("Wrong password");
                   }
                    

                  
                });


                }
                else{
                res.send("Wrong email");
                }
            }
        });

    // Email exists ?
    // If exists check passowrd correct
    //generate token
    // send it to client
    //if pwd wrong exit
    }
);
module.exports = router;
