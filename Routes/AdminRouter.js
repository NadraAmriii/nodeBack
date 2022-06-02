const express = require ("express");

const route = express.Router();
const AdminController = require("../Controllers/adminController");
const upload = require("../upload")


route.post("/",AdminController.createAdmin);
route.post("/login",AdminController.authenticate);
route.get("/",AdminController.getAlladmins);
route.get("/:id",AdminController.getMedecinBYID);
route.put("/:id",AdminController.updateMedecin);
route.put("/image/:id", upload.single('avatar'),AdminController.uploadavatar);
/*
route.post("/",GroupeController.AjouterUnjou);
route.get("/:id",GroupeController.getGroupBYID);
route.get("/",GroupeController.getAllgroupe);
route.delete("/:id",GroupeController.deleteGroupe);
route.put("/:id",GroupeController.updateGroupe);
*/


module.exports = route;