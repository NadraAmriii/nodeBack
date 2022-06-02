const express = require ("express");
const isauth = require("../middelware/isauth")
const isAdmin = require("../middelware/isadmin")

const route = express.Router();
const ConultationController = require("../Controllers/ConsultationController")

route.post("/",ConultationController.createconsultation);
route.get("/",ConultationController.getall);
route.put("/:id",ConultationController.updateConsultationinfo);
route.delete("/:id",ConultationController.dateleconsultation)
route.get("/:id",ConultationController.getbyid)
//route.get("/medecin/:id",ConultationController.getordersbyMedid)
module.exports = route;