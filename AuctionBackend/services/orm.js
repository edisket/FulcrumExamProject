const { Sequelize } = require('sequelize');

module.exports = () => {

    var sequelize = new Sequelize('', '', '', {
        dialect: 'sqlite',
        storage: "./database.sqlite3",
    })
    return sequelize;
}

