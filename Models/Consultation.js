const mongoose = require("mongoose")
const ConsultationSchema = new mongoose.Schema({
    joueur : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Joueur",
        required: true
    },
    dateConsultation : {
        type:  String,
       // required:true,
        
    },
    medecin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Medecin",
        required: true
    },
    ordonnance: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Ordonnance",
       // required: true
    },
],
Exam :[ {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Examen",
   // required : true
},],
resume : {
    type:String,
    //required:true,
}


},
{timestamps:true})
module.exports = mongoose.model("Consultation",ConsultationSchema)