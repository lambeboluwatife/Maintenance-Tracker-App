const express = require('express');
const router = express.Router();
const passport = require('passport');
const Admin = require("../models/admin");

// Root Route
router.get("/admin", (req, res) => {
  res.render("adminLanding");
});


// Show Register Form
router.get("/admin/register", (req, res) => {
  res.render("admin/register");
});

// Handle Sign Up Logic
router.post("/admin/register", (req, res) => {
    const newAdmin = new Admin({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    telephone: req.body.telephone
  });
  Admin.register(newAdmin, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("admin/register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/users/requests");
    });
  });
});

// show login form
router.get("/admin/login", (req, res) => {
  res.render("admin/login");
});

// Handling login Logic
router.post("/admin/login", passport.authenticate("local",
{
  successRedirect: "/users/requests",
  failureRedirect: "/admin/login"
}),(req, res) => {

});

// logout ROUTES
router.get("/admin/logout", (req, res) => {
  req.logout();
  res.redirect("/users/requests");
});

module.exports = router;
