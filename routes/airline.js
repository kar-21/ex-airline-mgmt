const express = require("express");
const router = express.Router();
const airlineController = require("../controller/airline.controller");

router.get("/getAirlineList", airlineController.getAirlineList);

router.get("/getPassangers/:flightNumber", airlineController.getPassangersOfFlight);

router.patch("/updatePassanger", airlineController.updatePassangerwithKey);

module.exports = router;
