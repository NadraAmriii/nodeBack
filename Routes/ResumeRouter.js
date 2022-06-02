const express = require("express");
const ResumeController = require("../Controllers/ResumeController");
const route = express.Router();

route.post("/",ResumeController.createResume);
route.put ("/:id",ResumeController.updateResume)
route.get("/",ResumeController.getall)

module.exports = route;