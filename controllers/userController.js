const User = require("../models/user");
const Message = require("../models/message");

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// Handle sign up form on GET
exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.render("../views/signup", { title: "User Sign Up" });
});

// Handle sign up form on POST
exports.user_signup_post = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// Handle log in form on GET
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("../views/login", { title: "User Login" });
});

// Handle log in form on POST
exports.user_login_post = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// Handle log out on POST
exports.user_logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Handle member form on GET
exports.member_create_get = asyncHandler(async (req, res, next) => {
  res.render("../views/member", { title: "Member Secret Word" });
});

// Handle member form on POST
exports.member_create_post = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// Handle admin form on GET
exports.admin_create_get = asyncHandler(async (req, res, next) => {
  res.render("../views/admin", { title: "Admin Secret Word" });
});

// Handle admin form on POST
exports.admin_create_post = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});
