const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  member_status: Boolean,
  admin_status: Boolean,
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

// Export model
module.exports = mongoose.model("User", UserSchema);
