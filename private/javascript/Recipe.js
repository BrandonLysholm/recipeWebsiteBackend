const {DataTypes, sequelize} = require("../../dataSource");


const Recipe = sequelize.define('Recipe', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
                isLowercase: true,
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    })

module.exports = Recipe;
