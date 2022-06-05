//Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_SERVER_URL || "mongodb+srv://NadraAmry:nadra123@cluster0.zdrqyat.mongodb.net/dossierJoueurs?retryWrites=true&w=majority"
const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}
mongoose.connect(mongoDB,connectionParams,(err) => {
  if(err){
    console.log(err)
  }
  console.log(`successfully connected to database`);
})

mongoose.Promise = global.Promise;
module.exports = mongoose;