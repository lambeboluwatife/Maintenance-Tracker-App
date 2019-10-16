const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("../models/user");

// Root Route
router.get("/", (req, res) => {
  res.render("landing");
});


// Show Register Form
router.get("/register", (req, res) => {
  res.render("register");
});

// Handle Sign Up Logic
router.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    telephone: req.body.telephone,
    gender: req.body.gender
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/user/requests");
    });
  });
});

// show login form
router.get("/login", (req, res) => {
  res.render("login");
});

// Handling login Logic
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/user/requests",
  failureRedirect: "/login"
}),(req, res) => {

});

// logout ROUTES
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/user/requests");
});

module.exports = router;
