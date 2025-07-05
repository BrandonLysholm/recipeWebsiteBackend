const express = require('express');
const app = express();
const cors = require('cors');

const ingredientCategoryRouter = require('./routes/ingredientCategoryRouter');
const recipeCategoryRouter = require('./routes/recipeCategoryRouter');
const ingredientRouter = require('./routes/ingredientRouter');
const recipeRouter = require('./routes/recipeRouter');

const {addAssociations} = require('./private/javascript/Associations');

const createAllTables = require('./fixtures/createTables.fix');

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#client_error_responses

app.use(cors());
app.use(express.json())

app.listen(8080, ()=>{
    console.log('Server running on port 8080');
})

app.get('/',(req,res)=>{
    res.send('Welcome to the server!');
})

app.use('/ingredientCategory',ingredientCategoryRouter);
app.use('/recipeCategory',recipeCategoryRouter);
app.use('/ingredient', ingredientRouter);
app.use('/recipe', recipeRouter);

addAssociations();
createAllTables(false);
