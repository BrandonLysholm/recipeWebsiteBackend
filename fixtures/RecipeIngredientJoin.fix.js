const Recipe = require("../private/javascript/Recipe");
const Measurement = require('../private/javascript/Measurement');
const Ingredient = require("../private/javascript/Ingredient");
const RecipeIngredientJoin = require("../private/javascript/RecipeIngredientJoin");

async function fillRecipeIngredientTable() {
    // getting ingredients
    const chicken = (await Ingredient.findOne({where: {name: 'chicken breast'}})).id;
    const oregano = (await Ingredient.findOne({where: {name: 'oregano'}})).id;
    const paprika = (await Ingredient.findOne({where: {name: 'paprika'}})).id;
    const salt = (await Ingredient.findOne({where: {name: 'salt'}})).id;
    const redPepperFlake = (await Ingredient.findOne({where: {name: 'red pepper flakes'}})).id;
    const oliveOil = (await Ingredient.findOne({where: {name: 'olive oil'}})).id;
    const grapeTomato = (await Ingredient.findOne({where: {name: 'grape tomatoes'}})).id;
    const garlic = (await Ingredient.findOne({where: {name: 'garlic'}})).id;
    const spinach = (await Ingredient.findOne({where: {name: 'spinach'}})).id;
    const lemonJuice = (await Ingredient.findOne({where: {name: 'lemon juice'}})).id;
    const rice = (await Ingredient.findOne({where: {name: 'rice'}})).id;
    const chickpea = (await Ingredient.findOne({where: {name: 'chickpeas'}})).id;
    const feta = (await Ingredient.findOne({where: {name: 'feta cheese'}})).id;



    // getting measurements
    const count = (await Measurement.findOne({where: {name: 'count'}})).id;
    const teaspoon = (await Measurement.findOne({where: {name: 'teaspoons'}})).id;
    const tablespoon = (await Measurement.findOne({where: {name: 'tablespoons'}})).id;
    const gram = (await Measurement.findOne({where: {name: 'grams'}})).id;
    const cup = (await Measurement.findOne({where: {name: 'cups'}})).id;
    const millilitres = (await Measurement.findOne({where: {name: 'millilitres'}})).id;



    // getting recipes
    const greekChicken = (await Recipe.findOne({where: {name: 'greek chicken and lemon rice'}})).id;


    // Filling out the ingredients for greek chicken
    await RecipeIngredientJoin.create({
        amount: 1,
        RecipeId: greekChicken,
        MeasurementId: count,
        IngredientId: chicken,
    })
    await RecipeIngredientJoin.create({
        amount: 1,
        RecipeId: greekChicken,
        MeasurementId: teaspoon,
        IngredientId: oregano
    })
    await RecipeIngredientJoin.create({
        amount: 0.5,
        RecipeId: greekChicken,
        MeasurementId: teaspoon,
        IngredientId: paprika
    })
    await RecipeIngredientJoin.create({
        amount: 0.25,
        RecipeId: greekChicken,
        MeasurementId: teaspoon,
        IngredientId: salt
    })
    await RecipeIngredientJoin.create({
        amount: 0.25,
        RecipeId: greekChicken,
        MeasurementId: teaspoon,
        IngredientId: redPepperFlake,
    })
    await RecipeIngredientJoin.create({
        amount: 2,
        RecipeId: greekChicken,
        MeasurementId: tablespoon,
        IngredientId: oliveOil,
    })
    await RecipeIngredientJoin.create({
        amount: 100,
        RecipeId: greekChicken,
        MeasurementId: gram,
        IngredientId: grapeTomato,
    })
    await RecipeIngredientJoin.create({
        amount: 3,
        RecipeId: greekChicken,
        MeasurementId: count,
        IngredientId: garlic
    })
    await RecipeIngredientJoin.create({
        amount: 70,
        RecipeId: greekChicken,
        MeasurementId: gram,
        IngredientId: spinach
    })
    await RecipeIngredientJoin.create({
        amount: 2,
        RecipeId: greekChicken,
        MeasurementId: tablespoon,
        IngredientId: lemonJuice
    })
    await RecipeIngredientJoin.create({
        amount: 0.33,
        RecipeId: greekChicken,
        MeasurementId: cup,
        IngredientId: rice
    })
    await RecipeIngredientJoin.create({
        amount: 200,
        RecipeId: greekChicken,
        MeasurementId: millilitres,
        IngredientId: chickpea,
    })
    await RecipeIngredientJoin.create({
        amount: 0.33,
        RecipeId: greekChicken,
        MeasurementId: cup,
        IngredientId: feta
    })



}

module.exports = fillRecipeIngredientTable;