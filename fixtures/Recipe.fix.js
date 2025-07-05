const Recipe = require("../private/javascript/Recipe");
const RecipeCategory = require("../private/javascript/RecipeCategory");

async function fillRecipeTable() {
    const breakfast = await RecipeCategory.findOne({where: {name: 'breakfast'}});
    const lunch = await  RecipeCategory.findOne({where: {name: 'lunch'}});
    const dinner = await RecipeCategory.findOne({where: {name: 'dinner'}})
    const spice = await RecipeCategory.findOne({where: {name: 'spice'}})

    const Recipes = [
        {name: 'greek chicken and lemon rice', RecipeCategoryId: dinner.id},
        {name: 'burritos', RecipeCategoryId: dinner.id},
    ]
    for (const recipe of Recipes) {
        await Recipe.create(recipe)
    }

}

module.exports = fillRecipeTable;