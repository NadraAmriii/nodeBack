const mongoose = require ('mongoose')
const ResumeSchema = new mongoose.Schema({
    desc : {
        type:String,
        required: true
    },
    joueur : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Joueur",
        required: true
    },
},
{timestamps:true})

module.exports = mongoose.model("Resume",ResumeSchema)