const mongoose = require('mongoose')

const GroupeSchema = new mongoose.Schema({
    AnneCreation: {
        type:String,
        required:true,
    },
    nom : {
        type: String,
        required:true,
    },
    joueurs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Joueur",
          required: true,
        },
      ],
   
   

});

module.exports = mongoose.model("Groupe",GroupeSchema);

