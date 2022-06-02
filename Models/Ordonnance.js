const mongoose = require("mongoose")
const OrdonnanceSchema = new mongoose.Schema({
    traitement : {
        type : String,
        //required: true,
        default:"pas de traitement",
    },
    Radio : {
        type : String,
       //required : true,
       default:"pas de radio",
    },
    Analyse :{
        type:String,
       // required : true,
        default:"pas d'analyse",
    },
    Vaccin : {
        type:String,
       // required : true,
        default:"pas de vaccin",
        
    },
    Pathologie : {
        type:String,
        //required : true,
        default:"pas de pathologie",

    },
    chirurgie : {
        type : String,
       // required : true,
        default:"pas de chrirugie",
    },
    Consultation : {
       type:mongoose.Schema.Types.ObjectId,
       ref : "Consultation",
       required : true
    } , 
    
 
},
{timestamps:true})
module.exports = mongoose.model("Ordonnance",OrdonnanceSchema);