const Resume  = require("../Models/Resume")
const Joueur = require("../Models/Joueur")

module.exports = {
    createResume: (req, res) => {
        Resume.create(req.body, (err, resume) => {
          if (err) {
            return res.status(500).json({
              message: "resume non cree " + err,
              data: null,
            });
          } else {
            Joueur.findOneAndUpdate(
              { _id: req.body.joueur},
              { $push: { resume: resume._id } },
              (error, joueur) => {
                if (error) {
                 return  res.status(500).json({
                    message: "REsume ajoutee mais non enregistre dans joueurs ",
                    data: null,
                  });
                } else {
                 return   res.status(200).json({
                    message: "resume ajoutee et enregistree avec le joueur ",
                    data: resume,
                  });
                }
              }
            );
          }
        });
      },
 updateResume : (req,res) => {
  Resume.findByIdAndUpdate(
    { _id: req.params.id },
    { desc: req.body.desc },
    (err, resume) => {
      if (err) {
       return  res.status(500).json({
          message: "Resume non modifie " + err,
          data: null,
        });
      } else {
        Resume.findById({ _id: req.params.id })
          .populate({ path: "joueur" })
         
          .then((resumes) => {
          return  res.status(200).json({
              message: "resumes modifiee ",
              data: resumes,
            });
            PopulateRes(resumes);
          })
          .catch((err) => {
          return   res.status(500).json({
              message: "probleme de modification ",
              data: null,
            });
          });
      }
    }
  );

 },
 getall: (req, res) => {
  Resume.find({})
    .populate({
      path: "joueur",
      populate: {
          path: "groupe",
        },
     
    })
    .then((resumes) => {
     return  res.status(200).json({
        message: "liste des resumes ",
        data: resumes,
        
       
      
      });
    })
    .catch((err) => {
     return  res.status(500).json({
        message: "pas de liste de resume",
        data: null,
      });
    });
},

}