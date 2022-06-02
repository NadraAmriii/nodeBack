const Groupe = require("../Models/Groupe");
const Joueur = require("../Models/Joueur");
//const Joueur = require("../Models/Joueur");
module.exports = {
  createGroupe: (req, res) => {
    let data = {
      nom: req.body.nom,
      AnneCreation: req.body.AnneCreation,
    };
    Groupe.create(data, (err, groupe) => {
      if (err) {
        res.status(500).json({
          message: "groupe non cree " + err,
          data: null,
        });
      } else {
        res.status(201).json({
          message: "groupe cree",
          data: groupe,
        });
      }
    });
  },
  //findById
  getGroupBYID: (req, res) => {
    Groupe.findById({ _id: req.params.id }, (err, groupe) => {
      // console.log(groupe.joueurs.nom);
      if (!groupe) {
        res.status(500).json({
          message: " groupe non trouve " + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "groupe trouvee",
          data: groupe,
        });
      }
    });
  },
  //update
  updateGroupe: (req, res) => {
    let data = {
      nom: req.body.nom,
      AnneCreation: req.body.AnneCreation,
    };
    Groupe.findOneAndUpdate({ _id: req.params.id }, data, (err, groupe) => {
      if (!groupe) {
        res.status(500).json({
          message: "groupe non modifie" + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "groupe modifie",
          data: groupe,
        });
      }
    });
  },
  //supprimer
  deleteGroupe: (req, res) => {
    Groupe.findByIdAndDelete({ _id: req.params.id }, (err, groupe) => {
      if (!groupe) {
        res.status(500).json({
          message: "groupe non supprime " + err,
          data: null,
        });
      } else {
        res.status(201).json({
          message: "groupe supprime",
          data: null,
        });
      }
    });
  },

  //findAll
  getAllgroupe: (req, res) => {
    Groupe.find({}, (err, groupes) => {
      if (groupes.length <= 0) {
        res.status(500).json({
          message: "aucun groupe" + err,
          data: null,
        });
      } else {
        res.status(201).json({
          message: "groupe dans le system ",
          data: groupes,
        });
      }
    });
  },
  //
  AjouterUnjou: (groupeId, joueur) => {
    Groupe.findByIdAndUpdate(
      groupeId,
      {
        $push: { joueurs: joueur_id },
      },
      { new: true, useFindAndModify: false }
    );
  },

  getallgroupes: (req, res) => {
    Groupe.find({})
      .populate({
        path: "joueurs",
      })
      .then((groupes) => {
        res.status(201).json({
          message: "groupes dans le system ",
          data: groupes,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "aucun groupe",
          data: null,
        });
      });
  },
  ////
  getGroupBYid: (req, res) => {
    Groupe.findById({ _id: req.params.id })
      .populate({
        path: "joueurs",
      })
      .then((groupe) => {
        res.status(200).json({
          message: "groupe trouvee",
          data: groupe,
        });
        // console.log(groupe.joueurs.nom);
      })
      .catch((err) => {
        res.status(500).json({
          message: " groupe non trouve " + err,
          data: null,
        });
      });
  },
};
