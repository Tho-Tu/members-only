const User = require("../models/user");
const Message = require("../models/message");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// Handle sign up form on GET
exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.render("../views/signup", { title: "User Sign Up" });
});

// Handle sign up form on POST
exports.user_signup_post = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Username must be specified.")
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters."),
  body("new-password")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Password must be specified."),
  body("confirm-password")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Confirmed password must be specified.")
    .custom((value, { req }) => {
      if (value !== req.body["new-password"]) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: req.body["confirm-password"],
      member_status: false,
      admin_status: false,
    });

    if (!errors.isEmpty()) {
      res.render("../views/signup", {
        title: "User Sign Up",
        user: user,
        errors: errors.array(),
      });
    } else {
      await user.save();
      res.redirect("/");
    }
  }),
];

// Handle log in form on GET
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("../views/login", { title: "User Login" });
});

// Handle log in form on POST
exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
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
