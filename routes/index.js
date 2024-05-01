const express = require("express");
const router = express.Router();

// protected routes
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// HOME PAGE ROUTE

router.get("/", message_controller.index);

// CREATE MESSAGE FORM on GET
router.get("/message", message_controller.message_create_get);

// CREATE MESSAGE FORM on POST
router.post("/message", isAuth, message_controller.message_create_post);

// DELETE MESSAGE on POST
router.get("/message", isAdmin, message_controller.message_delete);

// SIGN UP ROUTE on GET
router.get("/signup", user_controller.user_signup_get);

// SIGN UP ROUTE on POST
router.post("/signup", user_controller.user_signup_post);

// LOGIN ROUTE on GET
router.get("/login", user_controller.user_login_get);

// LOGIN ROUTE on POST
router.post("/login", user_controller.user_login_post);

// LOGOUT ROUTE
router.get("/logout", user_controller.user_logout);

// MEMBER ROUTE on GET
router.get("/member", user_controller.member_create_get);

// MEMBER ROUTE on POST
router.post("/member", isAuth, user_controller.member_create_post);

// ADMIN ROUTE on GET
router.get("/admin", user_controller.admin_create_get);

// ADMIN ROUTE on POST
router.post("/admin", isAuth, user_controller.admin_create_post);

module.exports = router;
