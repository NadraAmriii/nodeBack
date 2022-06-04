const mongoose = require('mongoose');

const MedecinSchema = new mongoose.Schema({
    nom : {
        type : String,
        required:true,
    },
    prenom : {
        type:String,
       required : true,
    },
    specialite : {
        type:String,
       required : true,
    },
    email : {
        type:String,
        required:true,
        unique:true,
    },
    motDepass : {
        type: String,
        required : true,
    },
    avatar : {
        type : String,
        default : 'avatar.png'
    },
    numero : {
        type:String
    }
})
module.exports = mongoose.model("Medecin",MedecinSchema)