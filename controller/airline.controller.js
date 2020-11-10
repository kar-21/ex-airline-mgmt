const airlineSchema = require("../model/airline.schema");
const passangerSchema = require("../model/passanger.schema");

exports.getAirlineList = (req, res, next) => {
  airlineSchema.find().then((data) => {
    res.send(data);
  });
};
exports.getPassangersOfFlight = async (req, res, next) => {
  const passangers = await passangerSchema.find({
    flightNumber: req.params.flightNumber,
  });
  res.send(passangers);
};
exports.updatePassangerwithKey = async (req, res, next) => {
  await passangerSchema.updateOne(
    {
      passportNumber: req.body.passportNumber,
      flightNumber: req.body.flightNumber,
    },
    { $set: { ...req.body.keyValuePair } }
  );
  res.send({ msg: "success" });
};
