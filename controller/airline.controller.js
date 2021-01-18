const airlineSchema = require("../model/airline.schema");
const passangerSchema = require("../model/passanger.schema");

exports.checkServer = (req, res, next) => {
  res.render("index", { title: "Airline Managment express.js" });
}
exports.getAirlineList = (req, res, next) => {
  airlineSchema.find().then((data) => {
    res.send(data);
  });
};
exports.updateAirlinewithKey = async (req, res, next) => {
  console.log("keyval", req.body.keyValuePair, req.body.flightNumber);
  await airlineSchema.updateOne(
    { flightNumber: req.body.flightNumber },
    { $set: { ...req.body.keyValuePair } }
  );
  res.send({ msg: "success" });
};
exports.getPassangersOfFlight = async (req, res, next) => {
  const passangers = await passangerSchema.find({
    flightNumber: req.params.flightNumber,
  });
  res.send(passangers);
};
exports.updatePassangerwithKey = async (req, res, next) => {
  console.log("keyvalue", req.body.keyValuePair);
  await passangerSchema.updateOne(
    {
      passportNumber: req.body.passportNumber,
      flightNumber: req.body.flightNumber,
    },
    { $set: { ...req.body.keyValuePair } }
  );
  res.send({ msg: "success" });
};
