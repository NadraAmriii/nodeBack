const Consultation = require ("../Models/Consultation");
const Joueur = require ("../Models/Joueur")
const Medecin = require("../Models/Medecin")

module.exports = {
    createconsultation: (req, res) => {
        Consultation.create(req.body, (err, consultation) => {
          if (err) {
          return   res.status(500).json({
              message: "consultation non cree " + err,
              data: null,
            });
          } else {
            Joueur.findOneAndUpdate(
              { _id: req.body.joueur,},
              { $push: { consultation: consultation._id } },
              (error, joueur) => {
                if (error) {
                 return res.status(500).json({
                    message: "consultation ajoutee mais non enregistre dans joueurs ",
                    data: null,
                  });
                } else {
                return  res.status(200).json({
                    message: "consultation ajoutee et enregistree avec le joueur ",
                    data: consultation,
                  });
                  
                }
              }
            ) 
          }
        });
      },
      getall: (req, res) => {
        Consultation.find({})
          .populate({
            path: "medecin",
          })
          .populate({
            path: "joueur",
            populate: {
                path: "groupe",
              },
           
          })
          .populate({path : "ordonnance"})
          .populate({path : "Exam"})
          .then((consultations) => {
           return  res.status(200).json({
              message: "liste des consultations ",
              data: consultations,
            
            });
          })
          .catch((err) => {
           return res.status(500).json({
              message: "pas de liste de consultations",
              data: null,
            });
          });
      },

      update: (req, res) => {
        Consultation.findByIdAndUpdate(
          { _id: req.params.id },
          { dateConsultation: req.body.dateConsultation },
          {resume:req.body.resume},
          (err, consultation) => {
            if (err) {
              return res.status(500).json({
                message: "Consultation non modifie" + err,
                data: null,
              });
            } else {
              Consultation.findById({ _id: req.params.id })
                .populate({ path: "medecin" })
                .populate({
                  path: "joueur",
                  populate: {
                    path: "groupe",
                  },
                })
                .populate({path : "ordonnance"})
                .populate({path : "Exam"})
                .then((consultations) => {
                 return res.status(200).json({
                    message: "consultations ",
                    data: consultations,
                  });
                  PopulateRes(consultations);
                })
                .catch((err) => {
                  return res.status(500).json({
                    message: "error modification",
                    data: null,
                  });
                });
            }
          }
        );
      },

      dateleconsultation: (req, res) => {
        Consultation.findByIdAndDelete({ _id: req.params.id }, (err, consultation) => {
          if (err) {
          return   res.status(500).json({
              message: "probeleme de suppression du consultation",
              data: null,
            });
          } else {
          return   res.status(200).json({
              message: "consultation supprimee avec succes",
              data: consultation,
            });
          }
        });
      },
      getbyid: (req, res) => {
        Consultation.findById({ _id: req.params.id })
          .populate({
            path: "medecin",
          })
          .populate({
            path: "joueur",
            populate: {
              path: "groupe",
            },
          })
          .populate({path : "ordonnance"})
          .populate({path : "Exam"})
          .then((consultation) => {
            return  res.status(200).json({
              message: "consultation trouvee ",
              data: consultation,
            });
            //console.log(consultation.dateConsultation);
          })
          .catch((err) => {
             return  res.status(500).json({
              message: "consultation non trouvee ",
              data: null,
            });
          });
      },

      ///
      getordersbyMedid: (req, res) => {
        console.log('dfxgsg');
        console.log(req.body.medecin._id );
        
        Consultation.find({ medecin: req.body.medecin.id }, (err, consultations) => {
          console.log(req.body.medecin.id );
          if (err) {
            res.status(500).json({
              message : 'no orders',
              data : []
            })
          } else {
            res.status(200).json({
              message:"user orders",
              data: consultations,
            });
          }
        });
      },
      updateConsultationinfo : (req , res) => {
        Consultation.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, consultation) => {
          if (err) {
            res.status(500).json({
              message: "consultation non modifiee",
            });
          } else {
            res.status(200).json({
              message: "consultation modifieee avec succes",
              data:req.body
            });
          }
        });
      }
     
}