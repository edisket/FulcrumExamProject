const router = require('express').Router();
const auctionService = require('../services/auctionService')();




router.get('/getAllProperty',async(req,res)=>{
    try{
        var data =  await auctionService.GetPropertyList();

        res.send(data);
    
    }catch(err){
        console.log(err);
        res.status(500);
        res.send(err);
    }
})
router.post('/bid', async(req,res)=>{



})


module.exports = router;
