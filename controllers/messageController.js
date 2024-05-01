const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// display all messages (Home Page)
exports.index = asyncHandler(async (req, res, next) => {
  res.render("../views/index", { title: "Message Board", user: req.user });
});

// handle message form on GET
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("../views/message", {
    title: "Write a Message 😊",
    user: req.user,
  });
});

// handle message form on POST
exports.message_create_post = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// handle message form on DELETE
exports.message_delete = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});
