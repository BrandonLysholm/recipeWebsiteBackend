const express = require('express');
const router = express.Router();
const IngredientCategory = require('../private/javascript/IngredientCategory');
const {sequelize} = require('../dataSource');

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#client_error_responses

router.get('/', async (req,res)=>{
    let allIngredientCategories = await IngredientCategory.findAll();

    res.send(allIngredientCategories);
})

router.post('/', async (req,res)=>{
    let status = 200;
    let msg = "weird";
    try {
        if (req.body !== undefined && req.body.name !== undefined){
            // sanitize input by making it all lowercase
            let newName = req.body.name.toLowerCase();

            msg = await IngredientCategory.create({name: newName});
        } else {
            status = 400;
            msg = "no body or name field"
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

    if (req.body !== undefined && req.body.id !== undefined){
        const currentEntry = await IngredientCategory.findByPk(req.body.id);
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

        if (await IngredientCategory.findByPk(req.params.id)){
            await IngredientCategory.destroy({where:{id:req.params.id}});
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
