const {DataTypes, sequelize} = require("../../dataSource");


const RecipeCategory = sequelize.define('RecipeCategory', {
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

module.exports = RecipeCategory;
