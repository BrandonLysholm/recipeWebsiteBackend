const {DataTypes, sequelize} = require("../../dataSource");


const IngredientCategory = sequelize.define('IngredientCategory', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "name can not be empty"
                },
                isAlpha: {
                    msg: "name can only consist of lowercase letters"
                },
                isLowercase: true,
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    })

module.exports = IngredientCategory;
