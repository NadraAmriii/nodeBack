const express = require ("express");



const route = express.Router();
const OrdonnanceController = require("../Controllers/ordonnanceController");


route.post("/",OrdonnanceController.createordonnance);
route.get("/",OrdonnanceController.getall)
route.get("/:id",OrdonnanceController.getordonnancebyid)
route.put("/:id",OrdonnanceController.updateordonnance)
route.delete("/:id",OrdonnanceController.deleteordonnance);







module.exports = route;