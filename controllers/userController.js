const User = require("../models/user");
const Message = require("../models/message");

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// Handle sign in form on GET
exports.user_signin_get = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// Handle sign in form on POST
exports.user_signin_post = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// Handle log in form on GET
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
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
  res.send("respond with a resource");
});

// Handle member form on POST
exports.member_create_post = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// Handle admin form on GET
exports.admin_create_get = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// Handle admin form on POST
exports.admin_create_post = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});
