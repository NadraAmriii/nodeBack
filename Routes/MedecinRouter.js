const express= require("express");
const route = express.Router();

const MedecinController = require('../Controllers/MedecinController');
const isauth =require('../middelware/isauth')
const upload  = require('../upload')

route.post("/login",MedecinController.authenticate);
route.post("/",MedecinController.createMdecin);
route.get ("/:id",MedecinController.getMedecinBYID);
route.put("/:id",MedecinController.updateMedecin);
route.put("/:id/update",MedecinController.UpdateMedInfo);
route.get("/",MedecinController.getAllmedecin);
route.delete("/:id",MedecinController.deleteMedecin);
route.put("/image/:id", upload.single('avatar'),MedecinController.uploadavatar);
route.get("/image/:id", MedecinController.Findavatar);
//route.get("/:id",MedecinController.getbycons)


module.exports = route;
