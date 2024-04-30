var express = require("express");
var router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

// HOME PAGE ROUTE

router.get("/", user_controller.index);

// CREATE MESSAGE FORM on GET
router.get("/message", message_controller.message_create_GET);

// CREATE MESSAGE FORM on POST
router.get("/message", message_controller.message_create_POST);

// DELETE MESSAGE on POST
router.get("/message", message_controller.message_DELETE);

// SIGN UP ROUTE on GET
router.get("/signup", user_controller.user_signin_get);

// SIGN UP ROUTE on POST
router.get("/signup", user_controller.user_signin_post);

// LOGIN ROUTE on GET
router.get("/login", user_controller.user_login_get);

// LOGIN ROUTE on POST
router.get("/login", user_controller.user_login_post);

// LOGOUT ROUTE
router.post("/logout", user_controller.user_logout);

// MEMBER ROUTE on GET
router.get("/member", user_controller.member_create_get);

// MEMBER ROUTE on POST
router.get("/member", user_controller.member_create_get);

// ADMIN ROUTE on GET
router.get("/admin", user_controller.admin_create_get);

// ADMIN ROUTE on POST
router.get("/admin", user_controller.admin_create_post);

module.exports = router;
