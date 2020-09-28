// Requiring our recipe models
const db = require("../models");
const passport = require("passport");
// Routes

module.exports = function(app) {
  app.get("/add-recipe", (req, res) => {
    res.render("partials/add-block");
  });
  // Routes for the Recipe Table
  app.get("/", (req, res) => {
    res.render("index");
  });

  // Routes for the Recipe Table
  app.get("/view-recipe", (req, res) => {
    db.Recipe.findAll({}).then(data => {
      const handlebarsObj = { recipes: [] };
      for (let i = 0; i < data.length; i++) {
        handlebarsObj.recipes.push(data[i].dataValues);
      }
      res.render("partials/recipes/view-block", handlebarsObj);
    });
  });

  // GET route for getting all recipes by User
  app.get("/api/user/:userName", (req, res) => {
    const username = req.params.userName;
    db.Recipe.findAll({
      where: {
        userName: username
      }
    }).then(data => {
      const handlebarsObj = {
        userName: username,
        recipes: data
      };
      res.render("user", handlebarsObj);
    });
  });

  // GET route for retrieving single recipe
  app.get("/api/recipe/:recipeName", (req, res) => {
    db.Recipe.findOne({
      where: {
        recipeName: req.params.recipeName
      }
    }).then(data => {
      res.json(data);
      const handlebarsObj = data.dataValues;
      res.render("recipe", handlebarsObj);
    });
  });
  // POST route for saving a new recipe
  app.post("/api/recipe", (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/add-recipe",
      failureRedirect: "/users/login"
    });

    db.Recipe.create({
      userName: req.body.userName,
      recipeName: req.body.recipeName,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      cookTime: req.body.cookTime,
      prepTime: req.body.prepTime
    }).then(data => {
      res.json(data);
    });
  });

  // DELETE route for users to delete recipes
  app.delete("/api/recipe/:id", (req, res) => {
    db.Recipe.destroy({
      where: { id: req.params.id }
    }).then(data => {
      res.json(data);
    });
  });

  app.put("/api/recipe", (req, res) => {
    db.Recipe.update(req.body, {
      where: { recipeName: req.body.recipeName }
    }).then(data => {
      res.json(data);
    });
  });
};
