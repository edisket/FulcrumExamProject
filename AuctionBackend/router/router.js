const router = require('express').Router();
const auctionController= require('../controller/auction');

router.use('/auction', auctionController)



module.exports = router;