const {DataTypes, sequelize} = require("../../dataSource");


const Measurement = sequelize.define('Measurement', {
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

module.exports = Measurement;