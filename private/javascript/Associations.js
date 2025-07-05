const Ingredient = require('./Ingredient');
const IngredientCategory = require('./IngredientCategory');
const Recipe = require('./Recipe');
const RecipeCategory = require('./RecipeCategory');
const RecipeIngredientJoin = require('./RecipeIngredientJoin');
const RecipeStep = require('./RecipeStep');
const Measurement = require('./Measurement');

addAssociations = () => {
    Ingredient.belongsTo(IngredientCategory);

    // Recipe associations
    // Category Association
    Recipe.belongsTo(RecipeCategory);
    // Ingredient association - includes info on measurement
    RecipeIngredientJoin.belongsTo(Recipe);
    RecipeIngredientJoin.belongsTo(Ingredient);
    RecipeIngredientJoin.belongsTo(Measurement);
    // Step association - gives directions of what needs to be done, with the order
    RecipeStep.belongsTo(Recipe);

}

module.exports = {addAssociations};
