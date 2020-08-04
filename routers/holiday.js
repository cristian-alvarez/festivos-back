const express = require("express");
const HolidayController = require("../controllers/holiday");

const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/add-holiday", [md_auth.ensureAuth], HolidayController.addHoliday);
api.get("/get-holidays", HolidayController.getHolidays);
api.put("/update-holiday/:id", [md_auth.ensureAuth], HolidayController.updateHoliday);
api.delete("/delete-holiday/:id", [md_auth.ensureAuth], HolidayController.deleteHoliday);
api.get("/get-holiday/:url", HolidayController.getHoliday);

module.exports = api;
