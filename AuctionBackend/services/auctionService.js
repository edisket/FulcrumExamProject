const { DataTypes, QueryTypes } = require('sequelize');
const sequelize = require('./orm')();
const propertyTable = require('../model/property_table')(sequelize, DataTypes);
const biddingTable = require('../model/bidding_table')(sequelize, DataTypes);





class AuctionService {



    //GET PROPERTY INFO
    /**
     * -id,
     * -propertyName,
     * -propertyAddress,
     * -currentValue,
     * -reservePrice,
     * -isBookmark,
     * -img,
     * -marketValue
     */
    GetAllProperty() {
        return new Promise(async (res, rej) => {
            try {
                await propertyTable.findAll({ raw: true }).then(x => {
                    rej(x);
                })
            } catch (err) {

                rej(err);
            }
        })

    }


    //Get Aggregate data of bidding data
    /**
     * -ACTIVE (TOTAL COUNT OF ACTIVE PROPERTY BIDDING)
     * -WINNING (TOTAL COUNT OF PROPERTY THAT BID IS WINNING)
     * -OUTBID (TOTAL COUNT OF PROPERT THAT BID IS LOSING)
     * -ACTIVE_VALUE (TOTAL VALUE OF ACTIVE BID)
     * -WINNING_VALUE (TOTAL VALUE OF WINNING BID)
     * -OUTBID_VALUE (TOTAL VALUE OF LOSING BID)
     */

    GetAuctionData() {
        return new Promise(async (res, rej) => {

            try {
                await sequelize.query('SELECT * VW_AuctionData', { raw: true, type: QueryTypes.SELECT }).then(x => {
                    res(x);
                })
            } catch (err) {
                rej(err)
            }

        })
    }


    //Get Property Bidding Data
    /**
     * -ID
     * -PROPERTY_ID
     * -BIDDING_VALUE (bid by the user)
     * -WINNING_BID (current winning bid)
     * -DIFF(Difference value with the formula of bidding_value - winning_bid)
     */

    GetBiddingProperty() {
        return new Promise(async (res, rej) => {
            try {
                await sequelize.query('SELECT * VW_BiddingProperty', { raw: true, type: QueryTypes.SELECT }).then(x => {
                    res(x);
                })
            } catch (err) {
                rej(err);
            }
        })
    }



    InsertBid(propertyId, biddingValue) {
        return new Promise(async (res, rej) => {

            try {
                const t = await sequelize.transaction();

                

            } catch (err) {


            }
        })
    }


    CheckIfBidExist(propertyId) {
        return new Promise(async (res, rej) => {
            try {
                await biddingTable.
            } catch (err) {
                rej(err);
            }
        })
    }

}



module.exports = () => new AuctionService();