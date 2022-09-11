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

                if (await this.CheckPropertyExist(propertyId)) {

                    var currentValue = await this.GetCurrentValue(propertyId);


                    if (biddingValue <= currentValue) {
                        t.rollback;

                        throw ("Bid value should be higher than current value")
                    }



                    if (await this.CheckIfBidExist(propertyId)) {

                        await biddingTable.update({ BIDDING_VALUE: biddingValue }, { where: { PROPERTY_ID: propertyId }, transaction: t });


                    } else {
                        biddingTable.create({
                            PROPERTY_ID: propertyId,
                            BIDDING_VALUE: biddingValue
                        }, { transaction: t });
                    }




                    await propertyTable.update({ current_value: biddingValue, last_value: currentValue }, { where: { id: propertyId }, transaction: t });


                    t.commit();

                    res();
                } else {
                    rej("Property doesn't exist")
                }

            } catch (err) {
                rej(err);
            }
        })
    }


    CheckIfBidExist(propertyId) {
        return new Promise(async (res, rej) => {
            try {
                await biddingTable.findOne({ where: { PROPERTY_ID: propertyId } }).then(x => {
                    if (x) {
                        res(true);
                    } else {
                        res(false);
                    }
                })
            } catch (err) {
                rej(err);
            }
        })
    }

    //CHECK IF PROPERTY EXIST
    CheckPropertyExist(propertyId) {
        return new Promise(async (res, rej) => {
            try {
                await propertyTable.findOne({ where: { id: propertyId } }).then(x => {
                    if (x) {
                        res(true);
                    } else {
                        res(false);
                    }
                })
            } catch (err) {
                rej(err);
            }
        })
    }


    GetCurrentValue(propertyId) {

        return new Promise(async (res, rej) => {
            try {

                await propertyTable.findOne({ where: { id: propertyId },raw:true, attributes: ['current_value'] }).then(x => {
                    res(x['current_value']);
                })

            } catch (err) {
                rej(err);
            }
        })
    }


    //THIS IS ONLY FOR SIMULATING BIDDING FOR THE OPPONENT
    /**
     * -This will update the current_value and last_value for the property_table
     * -This will not create/update a data inside the bidding_table because its only for the user
     * -The purpose of this function is to simulate to outbid the user
     */
    SimulateBidding(propertyId, biddingValue) {
        return new Promise(async (res, rej) => {

            try {

                if (await this.CheckPropertyExist(propertyId)) {

                    var currentValue = await this.GetCurrentValue(propertyId);
                    const t = await sequelize.transaction();

                    console.log(currentValue);
                    if (biddingValue <= currentValue) {
                        t.rollback;

                        throw ("Bid value should be higher than current value")
                    }


                    await propertyTable.update({ current_value: biddingValue, last_value: currentValue }, { where: { id: propertyId }, transaction: t });

                    t.commit();

                    res();
                } else {
                    rej("Property doesn't exist")
                }

            } catch (err) {
                rej(err);
            }
        })
    }

}



module.exports = () => new AuctionService();