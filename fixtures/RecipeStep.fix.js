const RecipeStep = require("../private/javascript/RecipeStep");
const Recipe = require("../private/javascript/Recipe");

async function fillRecipeStepTable() {
    const greekChicken = (await Recipe.findOne({where: {name: 'greek chicken and lemon rice'}})).id;

    await RecipeStep.create({
        stepOrder: 1,
        stepDirections: 'Start cooking the rice',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 2,
        stepDirections: 'Season the chicken with half the oregano, paprika, half the salt, and red pepper flakes',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 3,
        stepDirections: 'heat an empty cast iron pan over medium heat for 2 minutes.',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 4,
        stepDirections: 'Add 2 tablespoons of olive oil. Add chicken thighs. Cook the chicken on medium heat for 5 minutes on one side, undisturbed.',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 5,
        stepDirections: 'Flip the chicken thighs over, reduce heat to low-medium, and cook for about 5 more minutes or longer on the other side, without moving it, until its cooked through.',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 6,
        stepDirections: 'remove chicken from skillet once cooked',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 7,
        stepDirections: 'Add half of the halved grape tomatoes, minced garlic, 1 teaspoon of dried oregano, 0.25 teaspoon of salt, and 1 tablespoon of olive oil to the same, now empty, skillet. Cook the tomatoes on medium heat for about 2 minutes until they soften and release juices',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 8,
        stepDirections: 'Stir in fresh spinach until it wilts.',
        RecipeId: greekChicken
    });
    // Putting these out of order, to test sort
    await RecipeStep.create({
        stepOrder: 14,
        stepDirections: 'add sliced chicken back to the pan',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 15,
        stepDirections: 'when serving top with remaining feta cheese mixture',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 9,
        stepDirections: 'Add cooked rice and drained chickpeas',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 10,
        stepDirections: 'Add 3 tablespoons of freshly squeezed lemon juice and the remaining uncooked halved grape tomatoes. Reheat on medium heat, stirring everything to combine.',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 11,
        stepDirections: 'In a medium bowl, combine cubed Feta cheese with 1 tablespoon of extra virgin olive oil, 1 tablespoon of freshly squeezed lemon juice, 0.25 teaspoon of dried oregano',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 12,
        stepDirections: 'mix to coat feta',
        RecipeId: greekChicken
    });
    await RecipeStep.create({
        stepOrder: 13,
        stepDirections: 'add half of feta cheese mixture to pan',
        RecipeId: greekChicken
    });


}

module.exports = fillRecipeStepTable;