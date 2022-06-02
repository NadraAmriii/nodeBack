//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost/dossierJoueurs";
mongoose.connect(
  mongoDB,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("successfully connected to database");
  }
);
mongoose.Promise = global.Promise;
module.exports = mongoose;