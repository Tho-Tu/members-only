const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// display all messages (Home Page)
exports.index = asyncHandler(async (req, res, next) => {
  res.render("../views/index", { title: "Message Board" });
});

// handle message form on GET
exports.message_create_GET = asyncHandler(async (req, res, next) => {
  res.render("../views/message", { title: "Write a Message 😊" });
});

// handle message form on POST
exports.message_create_POST = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});

// handle message form on DELETE
exports.message_DELETE = asyncHandler(async (req, res, next) => {
  res.send("respond with a resource");
});
