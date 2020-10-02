var db = require("../models");
var bcrypt = require("bcrypt");

// Variables for bcrypt
var saltRounds = 10;

module.exports = function(app) {
  app.get("/users/login",function(req,res){
      res.render("partials/login")
  })

  // post route
  app.post("/users/register", function(req, res) {
    var userPW = req.body.password;
    var usernameInput = req.body.user_name
    if (!userPW || !usernameInput) {
      res.send("Fields Cannot Be Empty")
    }
    else {
    db.users.findOne({where:{user_name: usernameInput}}).then(function(data){
      if (data){
        console.log("Username already exist")
        res.send("Username already exists")
      
      }
    
    else{
      console.log(data)
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(userPW, salt, function(err, hash) {
        db.users.create({
          user_name: usernameInput,
          password: hash
        }).then(function(data) {
          console.log("New User Created")
          res.json(data);
        });
      });
    });
    }
  })}});

  // login page
  app.post("/users/login", function(req, res) {
    var userPW = req.body.password;
    db.users.findOne({
      where: {
        user_name: req.body.user_name
      }
    }).then(function(user) {
      if (!user) {
        res.send("User does not exist")
        res.redirect("/");
      } else {
        bcrypt.compare(userPW, user.password, function(err, result) {
          if (result == true) {
            console.log("Logged In")
            res.redirect("/");
          } else {
            res.send("Incorrect password");
            res.redirect("/users/login");
          }
        });
      }
    });
  });
};
