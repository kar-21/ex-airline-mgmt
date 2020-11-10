const mongoose = require("mongoose");

const PassangerSchema = new mongoose.Schema({
  name: String,
  passportNumber: String,
  address: String,
  contactNumber: Number,
  flightNumber: String,
  seatNumber: String,
  checkedIn: Boolean,
  wheelChair: Boolean,
  infants: Boolean,
  ancillaryServices: Boolean,
});

module.exports = mongoose.model("passangerlist", PassangerSchema);