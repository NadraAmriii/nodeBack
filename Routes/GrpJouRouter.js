const express = require ("express");

const route = express.Router();
const GroupejouController = require("../Controllers/grpJuCnstroller");


route.post("/",GroupejouController.createGroupejur);
/*route.post("/",GroupeController.AjouterUnjou);
route.get("/:id",GroupeController.getGroupBYID);
route.get("/",GroupeController.getAllgroupe);
route.delete("/:id",GroupeController.deleteGroupe);
route.put("/:id",GroupeController.updateGroupe);*/


module.exports = route;