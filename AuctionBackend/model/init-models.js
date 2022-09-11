var DataTypes = require("sequelize").DataTypes;
var _bidding_table = require("./bidding_table");
var _property_table = require("./property_table");

function initModels(sequelize) {
  var bidding_table = _bidding_table(sequelize, DataTypes);
  var property_table = _property_table(sequelize, DataTypes);

  bidding_table.belongsTo(property_table, { as: "PROPERTY", foreignKey: "PROPERTY_ID"});
  property_table.hasMany(bidding_table, { as: "bidding_tables", foreignKey: "PROPERTY_ID"});

  return {
    bidding_table,
    property_table,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
