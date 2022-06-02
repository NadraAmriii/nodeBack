const express = require ("express");


const route = express.Router();
const ExamController = require("../Controllers/examenController");

route.post("/",ExamController.createordonnance)
route.get("/:id",ExamController.getExambyid)
route.get("/",ExamController.getall)
route.put("/:id",ExamController.update)
route.delete("/:id",ExamController.supprimer)

module.exports = route;