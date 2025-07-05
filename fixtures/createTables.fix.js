const Ingredient = require ('../private/javascript/Ingredient');
const IngredientCategory = require ('../private/javascript/IngredientCategory');
const RecipeCategory = require ('../private/javascript/RecipeCategory');
const Recipe = require ('../private/javascript/Recipe');
const RecipeIngredientJoin = require ('../private/javascript/RecipeIngredientJoin');
const RecipeStep = require ('../private/javascript/RecipeStep');
const Measurement = require ('../private/javascript/Measurement');
const {addAssociations} = require('../private/javascript/Associations');

async function createTables(bForce) {
    await addAssociations();

    await Ingredient.sync({force: bForce});
    await IngredientCategory.sync({force: bForce});
    await RecipeCategory.sync({force: bForce});
    await Recipe.sync({force: bForce});
    await RecipeIngredientJoin.sync({force: bForce});
    await RecipeStep.sync({force: bForce});
    await Measurement.sync({force: bForce});
}

module.exports = createTables;
