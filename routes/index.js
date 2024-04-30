var express = require("express");
var router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// HOME PAGE ROUTE

router.get("/", user_controller.index);

// SIGN UP ROUTE
router.get("/signup", function (req, res, next) {
  res.render("index", { title: "Sign Up" });
});

// LOGIN ROUTE
router.get("/login", function (req, res, next) {
  res.render("index", { title: "Log In" });
});

// MEMBER ROUTE
router.get("/member", function (req, res, next) {
  res.render("index", { title: "Member" });
});

// ADMIN ROUTE
router.get("/admin", function (req, res, next) {
  res.render("index", { title: "Admin" });
});

module.exports = router;
