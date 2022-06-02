const mongoose = require('mongoose');
const GroupeJouSchema = new mongoose.Schema({
    groupe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Groupe",
        required: true,
      },
      joueurs: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Joueur",
        },
      ],
})
module.exports = mongoose.model("GrpJou",GroupeJouSchema);