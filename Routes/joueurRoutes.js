const express = require("express");
const JoueurContrller = require("../Controllers/JoueurContrller");
const upload = require("../upload")

const route = express.Router();


route.post("/", JoueurContrller.createJoueur);
route.get("/:id", JoueurContrller.getjoueurbyid);
route.put("/:id", JoueurContrller.updatejoueur);
route.get("/", JoueurContrller.getalljoueurs);
route.delete("/:id", JoueurContrller.deletejoueur);
route.post("/login",JoueurContrller.authenticate);
//route.get("/groupe",JoueurContrller.getjoueursbygroupeid)
route.put("/image/:id", upload.single('avatar'),JoueurContrller.uploadavatar);
module.exports = route;
