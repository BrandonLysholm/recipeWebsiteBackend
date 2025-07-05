const express = require('express');
const router = express.Router();
const recipeCategory = require('../private/javascript/RecipeCategory')

router.get('/', async (req,res)=>{
    let allRecipeCategories = await recipeCategory.findAll();

    res.send(allRecipeCategories);
})

router.post('/', async (req,res)=>{
    let status = 200;
    let msg = "weird";

    try {
        if (req.body !== undefined && req.body.name !== undefined) {
            let newName = req.body.name.toLowerCase();
            msg = await recipeCategory.create({name: newName});
        } else {
            status = 400;
            msg = "no body or name field"
        }

    } catch (error) {
        if (error.errors) {
            msg = error.errors[0].message;
        } else {
            msg = error.message;
        }
        status = 400;
    }

    res.status(status).send(msg);
})

router.put('/', async (req,res)=>{
    let status = 200;
    let msg = "weird";

    if (req.body !== undefined && req.body.id !== undefined){
        const currentEntry = await recipeCategory.findByPk(req.body.id);
        if (currentEntry !== undefined){
            try {
                msg = await currentEntry.update({name: req.body.name ? (req.body.name).toLowerCase() : undefined});
            } catch(error) {
                if (error.errors) {
                    msg =error.errors[0].message;
                } else {
                    msg=error.message;
                }
                status = 400;
            }
        } else {
            status = 404;
            msg = "no entries match that key";
        }
    } else {
        status = 400;
        msg = "no body or id field";
    }

    res.status(status).send(msg);
})

router.delete('/:id', async (req,res)=>{
    let status = 200;
    let msg = "weird";
    if (req.params.id !== undefined){

        if (await recipeCategory.findByPk(req.params.id)){
            await recipeCategory.destroy({where:{id:req.params.id}});
            msg="deleted successfully.";
            status = 200;

        } else {
            status = 404;
            msg = "no entries match that key";
        }
    } else {
        status = 400;
        msg = "no id param"
    }
    res.status(status).send(msg);
})


module.exports = router;
