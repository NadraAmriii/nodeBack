const mongoose = require('mongoose');
const ExamSchema = new mongoose.Schema({
    tempreture :{
        type:String,
        required:true
    },
    Poids : {
        type:String,
        required : true
    },
    taille : {
        type:String,
        required:true
    },
    tensionArterielle : {
        type:String,
        required : true
    },
    saturationOxygene : {
        type:String,
        required:true
    },
    Glycemie : {
        type:String,
        required:true
    },
    Consultation : {
        type:mongoose.Schema.Types.ObjectId,
       ref : "Consultation",
       required : true
    },
    Joueurs : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Joueur",
            required : true
    },
    medecin : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Medecin",
        required:true
    }

}, 
{timestamps:true})
module.exports = mongoose.model("Examen",ExamSchema)