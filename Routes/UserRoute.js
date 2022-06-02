const express= require("express");
const route = express.Router();

const UserController = require('../Controllers/UserController');

route.post("/",UserController.createuser);
route.get ("/:id",UserController.getuserbyid);
route.put("/:id",UserController.updateuser);
route.get("/",UserController.getallusers);
route.delete("/:id",UserController.deleteuser);
route.post("/login",UserController.authenticate);

module.exports = route;