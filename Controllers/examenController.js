const Examen = require("../Models/Exam");
const Consultation = require("../Models/Consultation");
const Joueur = require("../Models/Joueur")

module.exports = {
    createordonnance: (req, res) => {
        Examen.create(req.body, (err, examen) => {
          if (err) {
            res.status(500).json({
              message: "examen  non cree " + err,
              data: null,
            });
          } else {
            Joueur.findOneAndUpdate(
              { _id: req.body.Joueurs },
              { $push: { examen: examen._id } },
              (error, joueur) => {
                if (error) {
                 return  res.status(500).json({
                    message:
                      "Examen ajoutee mais non enregistre avec le joueur ",
                    data: null,
                  });
                } else {
                return   res.status(200).json({
                    message:
                      "Examen ajoutee et enregistreeavec le joueur",
                    data: examen,
                  });
                }
              }
            );
          }
        });
      },
      getExambyid: (req, res) => {
        Examen.findById({ _id: req.params.id })
    
          .populate({
            path: "Consultation",
          })
          .populate({
            path: "Joueurs"
          })
          .populate({
            path:"medecin"
         })
          .then((examen) => {
            if (examen){
             return  res.status(200).json({
                message: "examen trouve",
                data: examen,
              });
              
            }else {
             return  res.status(500).json({
                message: "examen non trouve ",
                data: null,
              });

            }
           
            console.log(examen)
          })
          .catch((err) => {
            res.status(500).json({
              message: "examen non trouvee " + err,
              data: null,
            });
          });
      },

      getall: (req, res) => {
        Examen.find({})
          .populate({
            path: "Consultation",
          })
          .populate({
            path:"Joueurs"
          })
          .populate({
             path:"medecin"
          })
    
          .then((examens) => {
            if(!examens){
              return res.status(500).json({
                message: "pas de liste des examens ",
                data: null,
              });
            }else {
              return res.status(200).json({
                message: " liste d examens",
                data: examens,
              });
            }
       
          })
          .catch((err) => {
           return res.status(500).json({
              message: "pas de liste d examens",
              data: null,
            });
          });
      },


      updateExam: (req, res) => {
        let data = {
          tempreture: req.body.tempreture,
          Poids: req.body.Poids,
          taille: req.body.taille,
          tensionArterielle: req.body.tensionArterielle,
          saturationOxygene: req.body.saturationOxygene,
          Glycemie: req.body.Glycemie,
          Consultation: req.body.Consultation,
        };
        Examen.findOneAndUpdate(
          { _id: req.params.id },
          data,
          (err, examen) => {
            if (!examen) {
           return   res.status(500).json({
                message: "examen non modifie  " + err,
                data: null,
              });
            } else {
           return  res.status(201).json({
                message: "examen modifie",
                data: req.body,
              });
            }
          }
        );
      },

      update: (req, res) => {
        let data = {
          tempreture: req.body.tempreture,
          Poids: req.body.Poids,
          taille: req.body.taille,
          tensionArterielle: req.body.tensionArterielle,
          saturationOxygene: req.body.saturationOxygene,
          Glycemie: req.body.Glycemie,
          Consultation: req.body.Consultation,
        };
        Examen.findByIdAndUpdate(
          { _id: req.params.id },
          data,
          (err, examen) => {
            if (err) {
            return  res.status(500).json({
                message: "exam not updated " + err,
                data: null,
              });
            } else {
              Examen.findById({ _id: req.params.id })
                .populate({ path: "Consultation" })
                .populate({path:"Joueurs"})
                .then((examens) => {
                return  res.status(200).json({
                    message: "examens ",
                    data: examens,
                  });
                  PopulateRes(examens);
                  console.log(examen);
                })
                .catch((err) => {
               return   res.status(500).json({
                    message: "error updateing",
                    data: null,
                  });
                });
            }
          }
        );
      },
    


      //delete
  deleteexam: (req, res) => {
    Examen.findOneAndDelete({ _id: req.params.id }, (err, Examen) => {
      if (!Examen) {
      return  res.status(500).json({
          message: "aucun Examen" + err,
          data: null,
        });
      } else {
      return  res.status(201).json({
          message: " Examen supprime",
          data: null,
        });
      }
    });
  },

  supprimer: (req, res) => {
    Examen.findByIdAndDelete(
      { _id: req.params.id },
      (err, examen) => {
        if (err) {
       return   res.status(500).json({
            message: "examen non supprime " + err,
            data: null,
          });
        } else {
          Examen.findById({ _id: req.params.id })
            .populate({ path: "Consultation" })
            
            .then((examens) => {
              if(examens){
             return   res.status(200).json({
                  message: "examens supprime ",
                  data: examens,
                });
              }else {

               return res.status(500).json({
                  message: "error de suppression",
                  data: null,
                });

              }
             
              PopulateRes(examens);
              console.log(examens);
            })
            .catch((err) => {
             return res.status(500).json({
                message: "error de suppression",
                data: null,
              });
            });
        }
      }
    );
  },

    
}