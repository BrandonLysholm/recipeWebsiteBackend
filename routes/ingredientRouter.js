const express = require('express');
const router = express.Router();
const Ingredient = require('../private/javascript/Ingredient');
const IngredientCategory = require('../private/javascript/IngredientCategory');
const {sequelize} = require('../dataSource');


router.get('/', async (req,res)=>{
    let allIngredients = await Ingredient.findAll({include: IngredientCategory});
    // let allIngredients = await Ingredient.findAll({include: IngredientCategory});

    res.send(allIngredients);
})

router.post('/', async (req,res)=>{
    let status = 200;
    let msg = "weird";

    try {
        // making sure the right fields are included
        if (req.body !== undefined && req.body.name !== undefined && req.body.categoryID !== undefined) {
            // sanitizing inputs
            let newName = req.body.name.toLowerCase();
            let ingredientCategoryID = req.body.categoryID;

            // making sure the category exists
            let ingredientCategory = await IngredientCategory.findByPk(ingredientCategoryID);

            if (ingredientCategory) {
                msg = await Ingredient.create({name: newName, IngredientCategoryId: ingredientCategoryID});
            } else {
                // category does not exist error
                msg = "Category not found";
                status = 404;
            }

        } else {
            status = 400;
            msg = "no body or name or ingredient category";
        }

    } catch (error) {
        if (error.errors) {
            msg =error.errors[0].message;
        } else {
            msg=error.message;
        }
        status = 400;
    }

    res.status(status).send(msg);
})

router.put('/', async (req,res)=>{
    let status = 200;
    let msg = "weird";

    if (req.body !== undefined && req.body.id !== undefined) {
        const currentEntry = await Ingredient.findByPk(req.body.id);
        if (currentEntry) {
            try {

                if (req.body.categoryID) {
                    let ingredientCategory = await IngredientCategory.findByPk(req.body.categoryID);
                    if (!ingredientCategory) {
                        // category does not exist error
                        msg = "Category not found";
                        status = 404;
                        // returning early to have better error message
                        // TODO: change model error message to not have to do this early return
                        res.status(status).send(msg);
                        return;
                    }
                }
                msg = await currentEntry.update({
                    name: req.body.name ? req.body.name : currentEntry.name,
                    IngredientCategoryId: req.body.categoryID ? req.body.categoryID : currentEntry.IngredientCategoryId,
                })
            } catch (error) {
                status = 400;
                if (error.errors) {
                    msg =error.errors[0].message;
                } else {
                    msg=error.message;
                }
            }

        } else {
            status = 404;
            msg = "no entries match that key";
        }
    } else {
        status = 400;
        msg = "no body or id";
    }
    res.status(status).send(msg);
})

router.delete('/:id', async (req,res)=>{
    let status = 200;
    let msg = "weird";

    if (req.params.id !== undefined) {
        if (await Ingredient.findByPk(req.params.id)){
            await Ingredient.destroy({where:{id:req.params.id}});
            msg = "deleted successfully";
            status = 200;
        } else {
            status = 404;
            msg = "no entries match that key"
        }

    } else {
        status = 400;
        msg = "no id param"
    }

    res.status(status).send(msg);
})

module.exports = router;