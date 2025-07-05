const Measurement = require('../private/javascript/Measurement');

async function fillMeasurementTable() {
    const Measurements = [
        'cups',
        'grams',
        'teaspoons',
        'tablespoons',
        'count',
        'millilitres'
    ];

    for (const measurement of Measurements) {
        await Measurement.create({
            name: measurement
        })
    }
}

module.exports = fillMeasurementTable;