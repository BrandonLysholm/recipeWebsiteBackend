const {Sequelize, DataTypes, Op} = require('sequelize');

let connectionString = 'sqlite:./private/database/recipes.db';

const sequelize = new Sequelize(connectionString, {logging: false});


module.exports = {Sequelize, DataTypes, sequelize, Op};
