const ItemModel = require('../models/Item');
const DealerModel = require('../models/Dealer');
const express =  require('express');
const router = express.Router();
router.post('/add',(req,res)=>{
    const formdata = {
        'name': req.body.name,
        'price':req.body.price,
        'seller':req.body.seller
       
        
            } 
        myPromise = ItemModel.create(formdata);
        myPromise.then(
            (newItem) =>{
                DealerModel.findById(req.body.seller,(err,theSeller)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        if(theSeller)
                        {
                            seller_stock = theSeller.stock;
                            seller_stock.push(newItem._id);
                            DealerModel.findByIdAndUpdate(req.body.seller, {"stock":seller_stock},(err,theDealer)=>{
                                DealerModel.findOne({"_id":req.body.seller}).populate("stock").then(
                                    (stk) =>{
                                        res.json(stk);
                                    }
                                );
                            });
                        }
                        else
                        {
                            res.json("seller not found");
                        }
                    }
                });
            }
        );            
 });
 
module.exports = router;