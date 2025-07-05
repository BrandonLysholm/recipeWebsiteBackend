const Ingredient = require("../private/javascript/Ingredient");
const IngredientCategory = require("../private/javascript/IngredientCategory");

async function fillIngredientTable() {
    const protein = await IngredientCategory.findOne({where: {name: 'protein'}});
    const veg = await IngredientCategory.findOne({where: {name: 'vegetable'}});
    const dairy = await IngredientCategory.findOne({where: {name: 'dairy'}});
    const spice = await IngredientCategory.findOne({where: {name: 'spice'}});
    const carb = await IngredientCategory.findOne({where: {name: 'carb'}});
    const misc = await IngredientCategory.findOne({where: {name: 'misc'}});

    const Ingredients = [
        {name: 'chicken breast', cat: protein},
        {name:'chickpeas', cat: protein},
        {name:'oregano', cat: spice},
        {name:'paprika', cat: spice},
        {name:'salt', cat: spice},
        {name:'red pepper flakes', cat: spice},
        {name:'olive oil', cat: misc},
        {name:'grape tomatoes', cat: veg},
        {name:'garlic', cat: spice},
        {name:'spinach', cat: veg},
        {name:'lemon juice', cat: misc},
        {name:'rice', cat: carb},
        {name:'feta cheese', cat: dairy},
    ]

    for (const ingredient of Ingredients) {
        let addedIngredient = await Ingredient.create({
            name: ingredient.name,
            IngredientCategoryId: ingredient.cat.id
        })
    }
}

module.exports = fillIngredientTable;
