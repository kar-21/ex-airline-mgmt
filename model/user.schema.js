const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: String,
  emailId: String,
  givenName: String,
  fullName: String,
  photoURL: String,
  role: String,
});

module.exports = mongoose.model("googleUsers", UserSchema);
