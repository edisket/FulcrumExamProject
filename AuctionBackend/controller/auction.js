const router = require('express').Router();
const auctionService = require('../services/auctionService')();


/**
 * @swagger
 * /auction/getAllProperty:
 *  get:
 *      summary: Get All Property Info
 *      description: Get All Property Data
 *      responses:
 *          '200':
 *              description:  Sucessful response return an array of object with property of (id, propertyName, propertyAddress, current_value, reservePrice, isBookMark, img, marketValue, last_value)
 *          '500':
 *              description: On Error it return (is_success, message)
 */

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

/**
 * @swagger
 * /auction/getAuctionData:
 *  get:
 *      summary: Get All User's Auction Data
 *      description: Get All Auction Data
 *      responses:
 *          '200':
 *              description:  Sucessful response return an object with property of (ACTIVE,WINNING,OUTBID,ACTIVE_VALUE,WINNING_VALUE,OUTBID_VALUE)
 *          '500':
 *              description: On Error it return (is_success, message)
 */
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


/**
 * @swagger
 * /auction/getBiddingProperty:
 *  get:
 *      summary: Get All Property's Bidding Data
 *      description: Get Property Bidding Data
 *      responses:
 *          '200':
 *              description:  Sucessful response return array of object with properties of (ID, PROPERTY_ID, BIDDING_VALUE, PROPERTY_NAME, WINNING_BID, LAST_BID_VALUE, DIFF)
 *          '500':
 *              description: On Error it return (is_success, message)
 */
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


/**
 * @swagger
 * /auction/insertbid:
 *  post:
 *      summary: Web user insert a bid to the property
 *      consumes:
 *          -application/json
 *      parameters:
 *          - in: body
 *            name: Bid Object
 *            description: Bid object consist of property id and bid value *(The bid value should be greater than current value)*
 *            schema:
 *                  type: object
 *                  required:
 *                      -propertyId
 *                      -biddingValue
 *                  properties:
 *                      propertyId:
 *                          type: integer
 *                      biddingValue:
 *                          type: number
 *      description: Post Bidding For User
 *      responses:
 *          '200':
 *              description:  Sucessful response return object with property (is_success = true)
 *          '500':
 *              description: On Error it return (is_success = false , message = error message)
 */
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
/**
 * @swagger
 * /auction/simulateOutbid:
 *  post:
 *      summary: This is for the tester to simulate the outbid.
 *      consumes:
 *          -application/json
 *      parameters:
 *          - in: body
 *            name: Bid Object
 *            description: Bid object consist of property id and bid value *(The bid value should be greater than current value)*
 *            schema:
 *                  type: object
 *                  required:
 *                      -propertyId
 *                      -biddingValue
 *                  properties:
 *                      propertyId:
 *                          type: integer
 *                      biddingValue:
 *                          type: number
 *      description: Post Bidding For User
 *      responses:
 *          '200':
 *              description:  Sucessful response return object with property (is_success = true)
 *          '500':
 *              description: On Error it return (is_success = false , message = error message)
 */
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
