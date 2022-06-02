const Admin = require("../Models/admin")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports={
    createAdmin : async (req,res) =>{
        const { nom, email, motDepass} = req.body;

    if (!email || !nom || !motDepass) {
      return res.status(500).json({ message: "Please enter all fields" });
    }

    try {
      const admin = await Admin.findOne({ email :email });
      if (admin) return res.status(500).json({ message: "user with this email is already exist" });

      const salt = await bcrypt.genSalt(10);
      if (!salt) throw Error("Something went wrong with bcrypt");

      const hash = await bcrypt.hash(motDepass, salt);
      if (!hash) throw Error("Something went wrong hashing the password");

      const newUser = new Admin({
        nom,
        email,
        motDepass: hash,
      });

      const savedUser = await newUser.save();
      if (!savedUser) return res.status(500).json({ message: "error saving the doctor" });

      res.status(200).json({
        message: "user successfuly registred",
        admin: savedUser,
      });
    } catch (e) {
      res.status(400).json({ message : "error registration failed" });
    }
    },
    //login 
    authenticate: (req, res) => {
        const { email, motDepass } = req.body;
        // Simple validation
        if (!email || !motDepass) {
          return res.status(500).json({ message: "Please enter all fields" });
        } else {
          Admin.findOne({ email: email }, async (err, admin) => {
            if (!admin) {
              res.status(500).json({
                message: "user with this email does not exist",
              });
            } else {
              const isMatch = await bcrypt.compare(motDepass, admin.motDepass);
    
              if (!isMatch) {
                res.status(500).json({
                  message: "invalid password",
                });
              } else {
                const token = jwt.sign({ id: admin._id }, "jwt-secret");
                res.status(200).json({
                  token: token,
                  admin: admin,
                });
              }
            }
          });
        }
      },
      
      //findAll
      getAlladmins: (req, res) => {
        Admin.find({}, (err, admins) => {
          if (admins.length <= 0) {
            res.status(500).json({
              message: "aucun admin" + err,
              data: null,
            });
          } else {
            res.status(201).json({
              message: "admin dans le system ",
              data: admins,
            });
          }
        });
      },
      uploadavatar: (req, res) => {
        const data = {
          avatar: req.file.filename,
        };
    
        Admin.findByIdAndUpdate({ _id: req.params.id }, data, (err, admin) => {
          console.log( req.params.id);
          if (err) {
            res.status(500).json({ message: "avatar not uploaded" });
          } else {
            Admin.findById({ _id: admin._id }, (nerr, nuser) => {
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
       //update
  updateMedecin: (req, res) => {
    let data = {
      nom: req.body.nom,
      //  prenom : req.body.prenom,
      email: req.body.email,
      motDepass: req.body.motDepass,
    };

    Admin.findOneAndUpdate({ _id: req.params.id }, data, (err, admin) => {
      // console.log(req.params.id);
      // console.log(mongoose.Types.ObjectId.isValid(req.params.id))
      if (err) {
        res.status(500).json({
          message: "admin non modifie" + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "admin modifie",
          data: admin,
        });
      }
    });
  },

   //findById
   getMedecinBYID: (req, res) => {
    Admin.findById({ _id: req.params.id }, (err, admin) => {
      if (!admin) {
        res.status(500).json({
          message: " admin non trouve " + err,
          data: null,
        });
      } else {
        res.status(200).json({
          message: "admin trouvee",
          data: admin,
        });
      }
    });
  },
}