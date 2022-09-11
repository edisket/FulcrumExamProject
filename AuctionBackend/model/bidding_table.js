const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bidding_table', {
    ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    PROPERTY_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'property_table',
        key: 'id'
      }
    },
    BIDDING_VALUE: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bidding_table',
    timestamps: false
  });
};
