const IngredientCategory = require('../private/javascript/IngredientCategory');
const IngredientCategories = require('./ingredientCategory.json');

async function fillIngredientCategoryTable() {
    for (const ingredientCategory of IngredientCategories) {
        await IngredientCategory.create({
            'name': ingredientCategory.name
        });
    }
}

async function resetTable() {
    await IngredientCategory.sync({force: true})
    await fillIngredientCategoryTable();
}

resetTable();

module.exports = fillIngredientCategoryTable;
