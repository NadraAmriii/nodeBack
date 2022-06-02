const Medecin = require("../Models/Medecin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Groupe = require("../Models/Groupe");

module.exports = {
  createMdecin: async (req, res) => {
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const { nom, email, motDepass, specialite,prenom } = req.body;
    const valid = emailRegex.test(email);
    if (!email || !nom || !motDepass || !specialite || !valid ||!prenom) {
      return res.status(500).json({ message: "verifier vos champs" });
    }

    try {
      const medecin = await Medecin.findOne({ email: email });
      if (medecin)
        return res.status(500).json({ message: "Email doit etre unique" });

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error("Something went wrong with bcrypt");

      const hash = await bcrypt.hash(motDepass, salt);
      if (!hash) throw Error("Something went wrong hashing the password");

      const newUser = new Medecin({
        nom,
        email,
        specialite,
        prenom,
        motDepass: hash,
      });

      const savedUser = await newUser.save();
      if (!savedUser)
        return res.status(500).json({ message: "error saving the doctor" });

      res.status(200).json({
        message: "user successfuly registred",
        medecin: savedUser,
      });
    } catch (e) {
      res.status(400).json({ message: "error registration failed" });
    }
  },
  //findById
  getMedecinBYID: (req, res) => {
    Medecin.findById({ _id: req.params.id }, (err, medecin) => {
      if (!medecin) {
        res.status(500).json({
          message: " medecin non trouve " + err,
          data: null,
        });
      } else {
        
        res.status(200).json({
          message: "medecin trouvee",
          data: medecin,
        });
      }
    });
  },
  //update
  updateMedecin: (req, res) => {
    const hash = bcrypt.hashSync(req.body.motDepass, 10);
    let data = {
      motDepass: req.body.motDepass =hash,
    };

    Medecin.findOneAndUpdate({ _id: req.params.id }, data, (err, medecin) => {
      // console.log(req.params.id);
      // console.log(mongoose.Types.ObjectId.isValid(req.params.id))
      if (err) {
        res.status(500).json({
          message: "medecin non modifie" + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "medecin modifie",
          data: medecin,
        });
      }
    });
  },

  UpdateMedInfo: (req, res) => {
    //const salt = await bcrypt.genSalt(10);
    Medecin.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      (err, medecin) => {
        if (err) {
          res.status(500).json({
            message: "error  " + err,
          });
        } else {
         // medecin.motDepass = await bcrypt.hash(medecin.motDepass, salt);
         if(req.body.motDepass){
          const hash = bcrypt.hashSync(req.body.motDepass, 10);
          req.body.motDepass = hash
          res.status(200).json({
            message: "medecin modifie",
            data: hash,
          });
         }
         else {
          res.status(200).json({
            message: "medecin modifie",
            data: req.body,
          });

         }
          
          
        }
      }
    );
  },
  //supprimer
  deleteMedecin: (req, res) => {
    Medecin.findByIdAndDelete({ _id: req.params.id }, (err, medecin) => {
      if (!medecin) {
        res.status(500).json({
          message: "medecin non supprime " + err,
          data: null,
        });
      } else {
        res.status(201).json({
          message: "medecin supprime",
          data: null,
        });
      }
    });
  },

  //findAll
  getAllmedecin: (req, res) => {
    Medecin.find({}, (err, medecins) => {
      if (medecins.length <= 0) {
        res.status(500).json({
          message: "aucun medecin" + err,
          data: null,
        });
      } else {
        res.status(201).json({
          message: "medecin dans le system ",
          data: medecins,
        });
      }
      console.log(medecins)
    });
  },
  //login
  authenticate: (req, res) => {
    const { email, motDepass } = req.body;
    // Simple validation
    if (!email || !motDepass) {
      return res.status(500).json({ message: "Please enter all fields" });
    } else {
      Medecin.findOne({ email: email }, async (err, medecin) => {
        if (!medecin) {
          res.status(500).json({
            message: "user with this email does not exist",
          });
        } else {
          const isMatch = await bcrypt.compare(motDepass, medecin.motDepass);

          if (!isMatch) {
            res.status(500).json({
              message: "invalid password",
            });
          } else {
            const token = jwt.sign({ id: medecin._id }, "jwt-secret");
            res.status(200).json({
              token: token,
              medecin: medecin,
            });
           // console.log(medecin._id);
          }
        }
      });
    }
  },

  //img

  uploadavatar: (req, res) => {
    const data = {
      avatar: req.file.filename,
    };

    Medecin.findByIdAndUpdate({ _id: req.params.id }, data, (err, medecin) => {
      console.log(req.params.id);
      if (err) {
        res.status(500).json({ message: "avatar not uploaded" });
      } else {
        Medecin.findById({ _id: medecin._id }, (nerr, nuser) => {
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

  //
  Findavatar: (req, res) => {
    

    Medecin.findById({ _id: req.params.id }, (err, medecin) => {
      console.log(req.params.avatar);
      if (err) {
        res.status(500).json({ message: "avatar non trouve" });
      } else {
      
            res.status(200).json({
              message: "avatar trouvee",
              data: medecin.avatar,
            });
          }
     
    });
  },
  getbycons: (req, res) => {
    Medecin.findById({ _id: req.params.id })
      .populate({
        path: "Consultationn",
      })
   
      .then((medecin) => {
        return  res.status(200).json({
          message: "consultation trouvee ",
          data: medecin,
        });
        
      })
      .catch((err) => {
         return  res.status(500).json({
          message: "consultation non trouvee ",
          data: null,
        });
      });
  },
};
