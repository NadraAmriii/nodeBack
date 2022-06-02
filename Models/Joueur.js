const mongoose = require('mongoose');
const JoueurSchema = new mongoose.Schema({
    nom : {
        type:String,
        required : true
    },
    prenom : {
        type:String,
    
    },
  
    email:{
        type:String,
        required:true,
        unique:true
    },
    motDepass : {
        type:String,
        required:true
    },
    groupe : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Groupe",
        required: true,
    },
    consultation : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:"Consultation",
        
    }],

    examen : [{
        type : mongoose.Schema.Types.ObjectId,
        ref :"Examen"
    }],
    resume : [
     {   type : mongoose.Schema.Types.ObjectId,
        ref : "Resume",
    }
    ],
   
    avatar : {
        type : String,
        default : 'avatar.png'
    }   
   

})
module.exports = mongoose.model("Joueur",JoueurSchema);