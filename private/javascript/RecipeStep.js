const {DataTypes, sequelize} = require("../../dataSource");


const RecipeStep = sequelize.define('RecipeStep', {
        stepOrder: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stepDirections: {
            type: DataTypes.STRING,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    })

module.exports = RecipeStep;
