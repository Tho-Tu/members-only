const User = require("../models/user");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// display all messages (Home Page)
exports.index = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({})
    .sort({ time: -1 })
    .populate("user")
    .exec();

  res.render("../views/index", {
    title: "Message Board",
    user: req.user,
    messages: messages,
  });
});

// handle message form on GET
exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render("../views/message", {
    title: "Write a Message 😊",
    user: req.user,
  });
});

// handle message form on POST
exports.message_create_post = [
  body("title")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Title must be specified (with at least 3 characters)."),

  body("message")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("Message must be specified (with at least 3 characters)."),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      user: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render("../views/message", {
        title: "Member Secret Word",
        user: req.user,
        message: message,
        errors: errors.array(),
      });
      return;
    } else {
      await message.save();
      res.redirect("/");
    }
  }),
];

// handle message form on DELETE
exports.message_delete = asyncHandler(async (req, res, next) => {
  const message = await Message.find().populate("user").exec();
  const singleMessage = await Message.findById(req.body.messageid)
    .populate("user")
    .exec();

  if (singleMessage === null) {
    res.redirect("/");
    return;
  } else {
    await Message.findByIdAndDelete(req.body.messageid);
    res.redirect("/");
  }
});
