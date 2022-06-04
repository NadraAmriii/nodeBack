const Joueur = require("../Models/Joueur");
//const joueur = require("../Models/Joueur");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Groupe = require("../Models/Groupe");

module.exports = {
  createJoueur: async (req, res) => {
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const { nom, email, motDepass, groupe,prenom } = req.body;
    const valid = emailRegex.test(email);
    if (!email || !nom || !motDepass || !groupe || !valid) {
      return res.status(500).json({ message: "Please enter all fields" });
    }

    try {
      const joueur = await Joueur.findOne({ email: email });
      if (joueur)
        return res.status(500).json({ message: "user with this email is already exist" });

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error("Something went wrong with bcrypt");

      const hash = await bcrypt.hash(motDepass, salt);
      if (!hash) throw Error("prbleme hash du mot de pass");

      const newUser = new Joueur({
        nom,
        email,
        groupe,
        prenom,
        motDepass: hash,
      });
      const savedUser = await newUser.save();
      if (!savedUser) {
        return res
          .status(500)
          .json({ message: "probleme d'enregistrement du joueur" });
      } else {
        // console.log(newUser._id.toString());
        Groupe.findOneAndUpdate(
          { _id: req.body.groupe },
          { $push: { joueurs: savedUser._id.toString() } },

          (error, joueur) => {
            // console.log(req.body.groupe);
            if (error) {
              return res.status(500).json({
                message: "joeurs ajoute mais non ajoute dans le groupe ",
                user: savedUser,
              });
            } else {
              return res.status(200).json({
                message: "joueurs enregistre et ajoute dans le groupe ",
                user: savedUser,
              });
            }
          }
        );
      }
    } catch (e) {
      return res.status(400).json({ message: "non enregistre" });
    }
  },

  //findbyid
  getjoueurbyid: (req, res) => {
    Joueur.findOne({ _id: req.params.id })

      .populate({
        path: "groupe",
      })
      .populate({
        path:"consultation",
        populate: {
          path: "medecin",
        },
      })
      .populate({
        path:"examen"
      })
      .then((joueur) => {
      return res.status(200).json({
          message: "joueur trouve",
          data: joueur,
        });
      
         
      })
      .catch((err) => {
       return  res.status(500).json({
          message: "joueur non trouvee ",
          data: null,
        });
      });
  },

  //update
  updatejoueur: (req, res) => {
    let data = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
     // motDepass: req.body.motDepass,
      groupe: req.body.groupe,
    };
    Joueur.findOneAndUpdate({ _id: req.params.id }, data, (err, joueur) => {
      if (!joueur) {
        return res.status(500).json({
          message: "joueur non modifie  " + err,
          data: null,
        });
      } else {
        return res.status(201).json({
          message: "joueur modifie",
          data: req.body,
        });
      }
    });
  },

  //delete
  deletejoueur: (req, res) => {
    Joueur.findOneAndDelete({ _id: req.params.id }, (err, Joueur) => {
      if (!Joueur) {
        return res.status(500).json({
          message: "aucun joueur" + err,
          data: null,
        });
      } else {
        return res.status(201).json({
          message: " joueur supprime",
          data: null,
        });
      }
    });
  },
  //findall
  getalljoueurs: (req, res) => {
    Joueur.find({})
      .populate({
        path: "groupe",
      })
      .populate({
        path:"consultation",
        populate: {
          path: "medecin",
        },
        populate:{
          path:"ordonnance",
        }
      })
      .populate({
        path:"examen"
      })
      .then((joueurs) => {
       console.log(joueurs);
        return res.status(201).json({
          message: "joueurs dans le system ",
          data: joueurs,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "aucun joueur",
          data: null,
        });
      });
  },

  //login
  authenticate: (req, res) => {
    const { email, motDepass } = req.body;
    // Simple validation
    if (!email || !motDepass) {
      return res.status(500).json({ message: "Please enter all fields" });
    } else {
      Joueur.findOne({ email: email }, async (err, joueur) => {
        if (!joueur) {
          res.status(500).json({
            message: "user with this email does not exist",
          });
        } else {
          const isMatch = await bcrypt.compare(motDepass, joueur.motDepass);

          if (!isMatch) {
           return res.status(500).json({
              message: "invalid password",
            });
          } else {
            const token = jwt.sign({ id: joueur._id }, "jwt-secret");
         return  res.status(200).json({
              token: token,
              joueur: joueur,
       
            });
           
          }
     
        }
      });
    }
  },
/*
  getjoueursbygroupeid: (req, res) => {
    console.log("dfxgsg");
    Joueur.find({ groupe: req.body.id }, (err, joueurs) => {
      console.log(req.body.id);
      if (err) {
     return   res.status(500).json({
          message: "no orders",
          data: [],
        });
      } else {
      return  res.status(200).json({
          message: "user orders",
          data: joueurs,
        });
      }
    });
  },*/

  createGroupejur: (req, res) => {
    Groupe.create(req.body, (err, groupe) => {
      if (err) {
       return res.status(500).json({
          message: "groupe non cree " + err,
          data: null,
        });
      } else {
        Joueur.findOneAndUpdate(
          { _id: req.body.groupe },
          { $push: { groupejous: groupe._id } },
          (error, joueur) => {
            if (error) {
            return  res.status(500).json({
                message: "order added but not pushed in user  ",
                data: null,
              });
            } else {
            return  res.status(200).json({
                message: "order added and pushed in user  ",
                data: null,
              });
            }
          }
        );
      }
    });
  },
 
  uploadavatar: (req, res) => {
    const data = {
      avatar: req.file.filename,
    };

    Joueur.findByIdAndUpdate({ _id: req.params.id }, data, (err, joueur) => {
      console.log( req.params.id);
      if (err) {
        res.status(500).json({ message: "avatar not uploaded" });
      } else {
        Joueur.findById({ _id: joueur._id }, (nerr, nuser) => {
          if (nerr) {
            res.json("error");
          } else {
            res.status(200).json({
              message: "user updated",
              data: nuser,
            });
          }
        });
      }
    });
  },
  updateMedecin: (req, res) => {
    const hash = bcrypt.hashSync(req.body.motDepass, 10);
    let data = {
      motDepass: req.body.motDepass =hash,
    };

    Joueur.findOneAndUpdate({ _id: req.params.id }, data, (err, joueur) => {
      // console.log(req.params.id);
      // console.log(mongoose.Types.ObjectId.isValid(req.params.id))
      if (err) {
        res.status(500).json({
          message: "joueur non modifie" + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "joueur modifie",
          data: joueur,
        });
      }
    });
  },
};
