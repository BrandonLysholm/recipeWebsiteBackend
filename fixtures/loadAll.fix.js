const createTables = require('./createTables.fix');
const fillIngredientCategoryTable = require('./IngredientCategory.fix');
const fillIngredientTable = require('./Ingredient.fix');
const fillRecipeCategoryTable = require('./RecipeCategory.fix');
const fillRecipeTable = require('./Recipe.fix');
const fillMeasurementTable = require("./Measurement.fix");
const fillRecipeIngredientTable = require("./RecipeIngredientJoin.fix");
const fillRecipeStepTable = require("./RecipeStep.fix");

async function loadEverything() {
    await createTables(true);
    await fillIngredientCategoryTable();
    await fillIngredientTable();
    await fillRecipeCategoryTable();
    await fillMeasurementTable();
    await fillRecipeTable();
    await fillRecipeIngredientTable();
    await fillRecipeStepTable();

}

loadEverything();
