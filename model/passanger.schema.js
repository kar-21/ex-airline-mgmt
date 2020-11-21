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
  checkinServices: [String],
  mealType: String,
  shopItem: [String],
  inflightServices:[String],
});

module.exports = mongoose.model("passangerlist", PassangerSchema);