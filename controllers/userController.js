const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// Handle sign up form on GET
exports.user_signup_get = asyncHandler(async (req, res, next) => {
  res.render("../views/signup", { title: "User Sign Up", user: req.user });
});

// Handle sign up form on POST
exports.user_signup_post = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Username must be specified (with at least 3 characters).")
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters.")
    .custom(async (value) => {
      const user = await User.findOne({ username: value }).exec();
      if (user) {
        throw new Error("Username already in use.");
      }
    }),
  body("new-password")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Password must be specified (with at least 3 characters)."),
  body("confirm-password")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage(
      "Confirmed password must be specified (with at least 3 characters)."
    )
    .custom((value, { req }) => {
      if (value !== req.body["new-password"]) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    bcryptjs.hash(req.body["new-password"], 10, async (err, hashedPassword) => {
      if (err) {
        next(err);
      }
      // otherwise, store hashedPassword in DB

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
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
        res.redirect("/login");
      }
    });
  }),
];

// Handle log in form on GET
exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("../views/login", { title: "User Login", user: req.user });
});

// Handle log in form on POST
exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

// Handle log out on GET
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
  res.render("../views/member", {
    title: "Member Secret Word",
    user: req.user,
  });
});

// Handle member form on POST
exports.member_create_post = [
  body("member-secret")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Secret word must be specified (with at least 3 characters).")
    .custom(async (value) => {
      if (value === "member") {
        return true;
      } else {
        throw new Error("Wrong secret word");
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.user.username,
      password: req.user.password,
      member_status: true,
      admin_status: req.user.admin_status,
      _id: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render("../views/member", {
        title: "Member Secret Word",
        user: req.user,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, user, {});
      res.redirect("/");
    }
  }),
];

// Handle admin form on GET
exports.admin_create_get = asyncHandler(async (req, res, next) => {
  res.render("../views/admin", { title: "Admin Secret Word", user: req.user });
});

// Handle admin form on POST
exports.admin_create_post = [
  body("admin-secret")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Secret word must be specified (with at least 3 characters).")
    .custom(async (value) => {
      if (value === "admin") {
        return true;
      } else {
        throw new Error("Wrong secret word");
      }
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const user = new User({
      username: req.user.username,
      password: req.user.password,
      member_status: true,
      admin_status: true,
      _id: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render("../views/member", {
        title: "Member Secret Word",
        user: req.user,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, user, {});
      res.redirect("/");
    }
  }),
];
