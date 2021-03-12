const express = require("express");
const router = express.Router();
const airlineController = require("../controller/airline.controller");

router.get("/", airlineController.checkServer)

router.get("/getAirlineList", airlineController.getAirlineList);

router.patch("/updateAirlineList", airlineController.updateAirlinewithKey);

router.get("/getPassangers/:flightNumber", airlineController.getPassangersOfFlight);

router.patch("/updatePassanger", airlineController.updatePassangerwithKey);

router.post("/addNewPassanger", airlineController.addNewPassanger);

module.exports = router;
