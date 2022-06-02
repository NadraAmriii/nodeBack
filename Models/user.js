const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nom : {
        type:String,
        required:true,
        
    },
    email : {
        type:String,
        require:true
    },
    motDepass : {
        type:String,
        require:true
    }
})
module.exports = mongoose.model("User",UserSchema);
