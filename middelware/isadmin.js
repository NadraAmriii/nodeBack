//const req = require("express/lib/request");
const jwt = require("jsonwebtoken");
//const Admin = require("../models/admin");
const User = require("../Models/user")

//to check if the user with the provided jwt token has admin role



//to check if the user with the provided jwt token has admin role

function isAdmin(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, "jwt-secret");
    // Add user from payload
    req.user = decoded;
    console.log("decoded user from token");

    User.findById({ _id: decoded.id }, (err, user) => {
      if (!user) {
        res.status(400).json({ msg: "user  is not exist" });
      } else {
        if (user.__t === "admin") {
          next();
        } else {
          res.status(400).json({ msg: "you are not admin !" });
        }
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
}

module.exports = isAdmin;