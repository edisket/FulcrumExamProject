const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('property_table', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertyAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    current_value: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0
    },
    reservePrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    isBookmark: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    marketValue: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    last_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'property_table',
    timestamps: false
  });
};
