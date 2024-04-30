const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  message: { type: String, required: true, maxLength: 200 },
  time: { type: Date, default: Date.now },
});

MessageSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.time).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
