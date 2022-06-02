const express = require ("express");
const isauth = require("../middelware/isauth")
const isAdmin = require("../middelware/isadmin")

const route = express.Router();
const GroupeController = require("../Controllers/GroupeController");


route.post("/",GroupeController.createGroupe);
route.post("/",GroupeController.AjouterUnjou);
//route.get("/:id",GroupeController.getGroupBYID);
//route.get("/",GroupeController.getAllgroupe);
route.delete("/:id",GroupeController.deleteGroupe);
route.put("/:id",GroupeController.updateGroupe);
route.get("/",GroupeController.getallgroupes)
route.get("/:id",GroupeController.getGroupBYid)


module.exports = route;