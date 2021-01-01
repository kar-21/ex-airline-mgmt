const mongoose = require("mongoose");

const AirLineSchema = new mongoose.Schema({
  flightFrom: String,
  flightTo: String,
  dateAndTimeOfDeparture: Date,
  flightNumber: String,
  flightPartner: String,
  gate: Number,
  checkinServices: [String],
  mealTypes: [String],
  shopItem: [String],
  inflightServices:[String],
});

module.exports = mongoose.model("airlinelist", AirLineSchema);
