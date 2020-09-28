const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

// Serialize Sessions
passport.serializeUser((userName, done) => {
  done(null, userName);
});

// Deserialize Sessions
passport.deserializeUser((userName, done) => {
  db.Users.findOne({ where: { id: userName.id } })
    .success(userName => {
      done(null, userName);
    })
    .error(err => {
      done(err, null);
    });
});

// For Authentication
passport.use(
  new LocalStrategy((userName, userPW, done) => {
    db.Users.findOne({ where: { userName: userName } }).success(user => {
      if (!user) {
        return done(null, false, { message: "Unknown Username" });
      }
      bcrypt.compare(userPW, user.password, (err, result) => {
        if (result === true) {
          return done(null, userName);
        }
        return done(null, false, { message: "Incorrect Password" });
      });
    });
  })
);
