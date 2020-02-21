const UserModel = require('../models/User');
const DealerModel = require('../models/Dealer');
const mongoose  = require('mongoose');
const express =  require('express');
const router = express.Router();
const bcrypt =  require('bcrypt');
router.post('/register',(req,res)=>{
    const formdata = {
        'address': req.body.address,
        'email': req.body.email,
        'password':req.body.password,
        'profilepicture':req.body.profilepicture,
        'usertype':"dealer"   
            } 

            
            bcrypt.genSalt(
            (err,salt) => {
                bcrypt.hash(formdata.password,salt,(err,hashPassword) => {
                    formdata.password = hashPassword;
                    formdata.salt = salt;
                    myPromise = UserModel.create(formdata);
                    myPromise.then(
                        function(newUser){
                            const data = {
                                'details':newUser._id,
                                'name':req.body.name,

                            }
                            DealerModel.create(data).then(
                                function(newReqUser)
                                {
                                    DealerModel.findOne({ _id: newReqUser._id }).populate("details").then(
                                        function(theDeaUser){
                                            UserModel.findOneAndUpdate({_id: newUser._id},{ typeref:newReqUser._id},{
                                                new: true
                                              }).then(
                                                    (fuser) =>{
                                                        
                                                        UserModel.findOne({_id :newUser._id}).populate("typeref").then(
                                                            (finUser) => {
                                                                console.log(finUser);
                                                                res.json(finUser);
                                                            }
                                                        );
                                                    }
                                              );
                                            
                                            
                                        }
                                    ) ;
                                }
                            ).catch(function(err) {
                                // If an error occurred, send it to the client
                                res.json(err);
                              });
                        }
                       
                    ).catch(
                        (err) =>{
                            console.log(err);
                        }
                    );
                });
            }
            );
            
 });
 router.post(
    "/update",(req,res) => {
        id = req.body.id;
        const formdata = {
            'address': req.body.address,
            'email': req.body.email,
            'password':req.body.password,
            'profilepicture':req.body.profilepicture 
        }
        console.log("The id is " + id);
        //console.log(req.body);
        console.log("searching for password");
        if(((formdata.password != undefined) && (formdata.password !='')))
        {
           console.log("PASSWORDFOUND");
           const salt = bcrypt.genSaltSync(2);
           const hash = bcrypt.hashSync(formdata.password, salt);
           formdata.password = hash;
           formdata.salt = salt;
           console.log("Salt Created");
        }
        console.log("about to search");
        UserModel.findByIdAndUpdate(id,formdata,{new:true},(err,doc) => {
            if(err){
                console.log(err);
            }
            else
            {
                if(doc)
                {
                  UserModel.findOne({_id:doc._id}).populate("typeref").then((fuser)=>{
                  const data = {
                      name:(req.body.name == ''?fuser.typeref.name:req.body.name)
                }
                //console.log(fuser);
               DealerModel.findByIdAndUpdate(fuser.typeref._id,data,{new:true},(err,doc)=> {
                   if(err)
                   {
                       console.log(err);
                   }
                   else{
                       res.json(doc);
                   }
               });
                  });
              


                }
                else{
                res.send("ID not found");
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