const mongoose = require("mongoose");

const AirLineSchema = new mongoose.Schema({
  flightFrom: String,
  flightTo: String,
  dateAndTimeOfDeparture: Date,
  flightNumber: String,
  flightPartner: String,
  gate: Number,
});

module.exports = mongoose.model("airlinelist", AirLineSchema);
