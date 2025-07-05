const {DataTypes, sequelize} = require("../../dataSource");


const RecipeIngredientJoin = sequelize.define('RecipeIngredientJoin', {
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    })

module.exports = RecipeIngredientJoin;
