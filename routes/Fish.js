const FishModel = require('../models/Fish');
const express =  require('express');
const router = express.Router();


router.post('/add',(req,res)=>{
    const formdata = {
        'name': req.body.name,
        'scientificname': req.body.scientificname,
        'maxlength':req.body.maxlength,
        'temperament':req.body.temperament,
        'habitat':req.body.habitat,
        'description':req.body.description,
        'picture':req.body.picture
            } 
        myPromise = FishModel.create(formdata);
        myPromise.then(
            (newFish) =>{
                res.json(newFish);
            }
        );            
 });
 
router.post('/delete',(req,res)=>{
   
        FishModel.findByIdAndDelete(req.body.id).then(
            (delFish) =>{
                if(delFish)
                {
                    res.json(delFish);
                }
                else
                {
                    res.send("Fish not found");
                }
            }
        );          
 });
 router.post(
    "/update",(req,res) => {
        id = req.body.id;
        const formdata = {
        'name': req.body.name,
        'scientificname': req.body.scientificname,
        'maxlength':req.body.maxlength,
        'temperament':req.body.temperament,
        'habitat':req.body.habitat,
        'description':req.body.description,
        'picture':req.body.picture
        }
        console.log("about to search");
        FishModel.findByIdAndUpdate(id,formdata,{new:true},(err,doc) => {
            res.json(doc);
        });

    // Email exists ?
    // If exists check passowrd correct
    //generate token
    // send it to client
    //if pwd wrong exit
    }
);
router.get(
"/all",(req,res)=>{
    FishModel.find((err,fishes)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.json(fishes);
        }
    });
}
);

module.exports = router;