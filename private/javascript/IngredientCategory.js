const {DataTypes, sequelize} = require("../../dataSource");


const IngredientCategory = sequelize.define('IngredientCategory', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isAlpha: true,
                notEmpty: true,
                isLowercase: true,
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    })

module.exports = IngredientCategory;
