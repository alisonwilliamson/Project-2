// Requiring our recipe models
var db = require("../models");
var passport = require("passport");
// Routes

module.exports = function (app) {
    // here so that I can check form for styling
    app.get("/add-recipe", function (req, res) {
        res.render("partials/inputs");
    });
    // recipe table
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/view-recipe", function (req, res) {
        db.recipe.findAll({})
        .then(function(data){
            var hdbsObj = {recipes:[]};
            for (let i = 0; i < data.length; i++) {
            hdbsObj.recipes.push(data[i].dataValues)
        }
        res.render("partials/recipes/card", hdbsObj);
        })
    });

    // GET route for getting all recipes by User
    app.get("/api/user/:user_name", function (req, res) {
        let username = req.params.user_name
        // console.log(username);
        db.recipe.findAll({
            where: {
                user_name: username
            }
        }).then(function (data) {

            var hdbsObj = {
                user_name: username,
                recipes: data
            }
            res.render("user", hdbsObj)
        });
    });

    // GET route for retrieving single recipe
    app.get("/api/recipe/:recipe_name", function (req, res) {
        db.recipe.findOne({
            where: {
                recipe_name: req.params.recipe_name
            }
        }).then(function (data) {
            var hdbsObj = data.dataValues
            res.render("recipe", hdbsObj)
        });
    });

    // save a new recipe
    app.post("/api/recipe", function (req, res) {
        db.recipe.create({
            user_name: req.body.user_name,
            recipe_name: req.body.recipe_name,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            cook_time: req.body.cook_time,
            prep_time: req.body.prep_time
        }).then(function (data) {
            res.json(data);
        });
    });

    // delete a recipe
    app.delete("/api/recipe/:id", function (req, res) {
        db.recipe.destroy({
            where: { id: req.params.id }
        }).then(function (data) {
            res.json(data);
        });
    });

    app.put("/api/recipe", function (req, res) {
        db.recipe.update(req.body, {
            where: { recipe_name: req.body.recipe_name }
        }).then(function (data) {
            res.json(data);
        });
    });
};
