const express = require('express');
const router = express.Router();
const Recipe = require('../private/javascript/Recipe')
const RecipeCategory = require('../private/javascript/RecipeCategory')
const RecipeIngredientJoin = require('../private/javascript/RecipeIngredientJoin')
const Ingredient = require('../private/javascript/Ingredient')
const Measurement = require('../private/javascript/Measurement')
const RecipeStep = require('../private/javascript/RecipeStep')
const {sequelize} = require("../dataSource");

router.get('/', async (req,res)=>{
    let allRecipes = await Recipe.findAll({include: RecipeCategory});
    res.send(allRecipes);
})

router.get('/:id', async (req,res)=>{
    let id = req.params.id;

    let recipe = await Recipe.findByPk(id, {include:RecipeCategory});
    let ingredients = await RecipeIngredientJoin.findAll({where: {RecipeId: id}, include: [{model: Ingredient}, {model: Measurement}]});
    let steps = await RecipeStep.findAll({where: {RecipeId: id}, order: sequelize.col('stepOrder')});

    res.send({
        recipe: recipe,
        steps: steps,
        ingredients: ingredients,
    })

})

module.exports = router;