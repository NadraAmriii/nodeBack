//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI || "mongodb://localhost/mongo-exercise";
mongoose.connect(
    mongoDB, { useUnifiedTopology: true, useNewUrlParser: true },
    () => {
        console.log("successfully connected to database");
    }
);
mongoose.Promise = global.Promise;
module.exports = mongoose;