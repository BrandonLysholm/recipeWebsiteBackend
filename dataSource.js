const {Sequelize, DataTypes, Op} = require('sequelize');

let connectionString = 'sqlite:./private/database/recipes.db';

if (process.env.TESTING_MODE==='testing') {
    connectionString = 'sqlite:./private/database/dev.db';
}

const sequelize = new Sequelize(connectionString, {logging: false});


module.exports = {Sequelize, DataTypes, sequelize, Op};
