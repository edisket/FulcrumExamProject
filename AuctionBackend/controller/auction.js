const router = require('express').Router();
const auctionService = require('../services/auctionService')();




router.get('/getAllProperty', async (req, res) => {
    try {
        var data = await auctionService.GetAllProperty();

        res.send(data);

    } catch (err) {
        res.status(500);
        res.send({
            'is_success': false,
            'message': err
        })
    }
})


router.get('/getAuctionData', async (req, res) => {

    try {

        var returnData = await auctionService.GetAuctionData();
        res.send(returnData);
    } catch (err) {
        res.status(500);
        res.send({
            'is_success': false,
            'message': err
        });
    }
})

router.get('/getBiddingProperty', async(req,res)=>{

    try {

        var returnData = await auctionService.GetBiddingProperty();
        res.send(returnData);
    } catch (err) {
        res.status(500);
        res.send({
            'is_success': false,
            'message': err
        });
    }

})

router.post('/insertbid', async (req, res) => {
    try {

        if (req.body['propertyId'] && req.body['biddingValue']) {

            await auctionService.InsertBid(req.body['propertyId'], req.body['biddingValue']).catch(err => {
                throw (err);
            });

            res.send({ 'is_success': true })

        } else {
            res.status(400);
            res.send({
                'is_success': false,
                'message': 'Invalid request'
            });
        }


    } catch (err) {
        res.status(500);
        res.send({
            'is_success': false,
            'message': err
        })
    }
})

router.post('/simulateOutbid', async (req, res) => {

    try {
        if (req.body['propertyId'], req.body['biddingValue']) {
            await auctionService.SimulateBidding(req.body['propertyId'], req.body['biddingValue'])

            res.send({
                'is_success': true
            })

        } else {
            res.status(400);
            res.send({
                'is_success': false,
                'message': 'Request is invalid'
            })
        }


    } catch (err) {
        res.status(500);
        res.send({
            'is_success': false,
            'message': err
        })
    }
})


module.exports = router;
