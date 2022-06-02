const mongoose = require("mongoose");
//const ser = require("../Models/user");
const AdminSchema = new mongoose.Schema({
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
    },
    avatar : {
        type : String,
        default : 'avatar.png'
    } 
})
module.exports = mongoose.model("Admin",AdminSchema);
