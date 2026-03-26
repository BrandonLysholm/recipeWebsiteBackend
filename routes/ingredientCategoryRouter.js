const express = require('express');
const router = express.Router();
const IngredientCategory = require('../private/javascript/IngredientCategory');
const {sequelize} = require('../dataSource');
const {ValidationError} = require("sequelize");

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#client_error_responses

router.get('/', async (req,res)=>{
    let allIngredientCategories = await IngredientCategory.findAll();

    res.send(allIngredientCategories);
})

router.get('/:id', async (req,res)=>{
    let id = req.params.id;
    let status = 200;
    let msg = "weird"

    try {
        const res = await IngredientCategory.findByPk(id);
        msg = res.dataValues;
    } catch (e) {
        status = 404;
        msg = {"error":"invalid key, not found"};
    }


    res.status(status).send(msg);


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
            msg ={"error": error.errors[0].message};
        } else {
            msg={"error": error.message};
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
                status = 400;
                if (error.errors) {
                    msg ={"error": error.errors[0].message};

                } else {
                    // specifically checking for an invalid key, to clean up the error message
                    // look at the delete to see a potentially cleaner implementation
                    if (error == "TypeError: Cannot read properties of null (reading 'update')") {
                        status = 404;
                        msg = {"error": "key does not exist"};
                    } else {
                        msg={"error":error.message};
                    }

                }

            }

        } else {
            status = 404;
            msg = {"error":"no entries match that key"};
        }
    } else {
        status = 400;
        msg = {"error":"no body or id field"};
    }

    res.status(status).send(msg);
})

router.delete('/:id', async (req,res)=>{
    let status = 200;
    let msg = "weird";
    if (req.params.id !== undefined){

        if (await IngredientCategory.findByPk(req.params.id)){
            await IngredientCategory.destroy({where:{id:req.params.id}});
            msg={"msg":"deleted successfully"};
            status = 200;

        } else {
            status = 404;
            msg = {"error":"no entries match that key"};
        }

    } else {
        status = 400;
        msg = "no id param"
    }
    res.status(status).send(msg);
})

module.exports = router;
