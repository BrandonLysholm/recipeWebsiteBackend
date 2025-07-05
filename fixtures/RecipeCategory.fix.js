const RecipeCategory = require('../private/javascript/RecipeCategory');

async function fillRecipeCategoryTable() {
    const RecipeCategories = [
        'breakfast',
        'lunch',
        'dinner',
        'spice'
    ]

    for (const recipeCategory of RecipeCategories) {
        await RecipeCategory.create({
            name: recipeCategory,
        });
    }
}

module.exports = fillRecipeCategoryTable;
