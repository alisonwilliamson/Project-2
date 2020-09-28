const db = require("../models");
// Dependencies
const bcrypt = require("bcrypt");
// Variables for bcrypt
const saltRounds = 10;

module.exports = function(app) {
  // Routes for the Users Table

  app.get("/users/login", (req, res) => {
    res.render("partials/login");
  });

  // POST route for the User_names
  app.post("/users/register", (req, res) => {
    const userPW = req.body.password;
    const usernameInput = req.body.userName;
    if (!userPW || !usernameInput) {
      res.send("Fields Cannot Be Empty");
    } else {
      db.Users.findOne({ where: { userName: usernameInput } }).then(data => {
        if (data) {
          console.log("Username already exist");
          res.send("Username already exists");
        } else {
          console.log(data);
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(userPW, salt, (err, hash) => {
              db.Users.create({
                userName: usernameInput,
                password: hash
              }).then(data => {
                console.log("New User Created");
                res.json(data);
              });
            });
          });
        }
      });
    }
  });

  //login page: storing and comparing username and password,and redirecting to / page after login
  app.post("/users/login", (req, res) => {
    const userPW = req.body.password;
    db.Users.findOne({
      where: {
        userName: req.body.user_name
      }
    }).then(user => {
      if (!user) {
        res.send("User Does not Exist");
        res.redirect("/");
      } else {
        bcrypt.compare(userPW, user.password, (err, result) => {
          if (result === true) {
            console.log("Logged In");
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
