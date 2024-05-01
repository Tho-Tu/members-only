const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true },
  member_status: Boolean,
  admin_status: Boolean,
});

// Export model
module.exports = mongoose.model("User", UserSchema);
