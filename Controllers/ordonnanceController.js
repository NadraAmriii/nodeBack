const Ordonnance = require("../Models/Ordonnance");
const Consultation = require("../Models/Consultation");

module.exports = {
  createordonnance: (req, res) => {
    const {traitement,Radio,Analyse,Vaccin,Pathologie,chirurgie} =req.body
    Ordonnance.create(req.body, (err, ordonnance) => {
      
      if (err) {
        return res.status(500).json({
          message: "ordonnance  non cree " + err,
          data: null,
        });
      } else {
        Consultation.findOneAndUpdate(
          { _id: req.body.Consultation },
          { $push: { ordonnance: ordonnance._id } },
          (error, consultation) => {
            if (error) {
              return res.status(500).json({
                message:
                  "ordonnance ajoutee mais non enregistre dans la consultation ",
                data: null,
              });
            } else {
              return res.status(200).json({
                message:
                  "ordonnance ajoutee et enregistree dans la consultation",
                data: ordonnance,
              });
            }
          }
        );
      }
    });
  },

  getall: (req, res) => {
    Ordonnance.find({})
      .populate({
        path: "Consultation",
      })

      .then((ordonnances) => {
        return res.status(200).json({
          message: "liste des ordonnances ",
          data: ordonnances,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "pas de liste d ordonnances",
          data: null,
        });
      });
  },
  getordonnancebyid: (req, res) => {
    Ordonnance.findOne({ _id: req.params.id })

      .populate({
        path: "Consultation",
      })
      .then((ordonnance) => {
        return res.status(200).json({
          message: "ordonnance trouve",
          data: ordonnance,
        });
        // console.log(ordonnance)
      })
      .catch((err) => {
        return res.status(500).json({
          message: "ordonnance non trouvee ",
          data: null,
        });
      });
  },

  updateordonnance: (req, res) => {
    let data = {
      traitement: req.body.traitement,
      Radio: req.body.Radio,
      Analyse: req.body.Analyse,
      Vaccin: req.body.Vaccin,
      Pathologie: req.body.Pathologie,
      chirurgie: req.body.chirurgie,
      Consultation: req.body.Consultation,
    };
    Ordonnance.findOneAndUpdate(
      { _id: req.params.id },
      data,
      (err, ordonnance) => {
        if (!ordonnance) {
          return res.status(500).json({
            message: "ordonnance non modifie  " + err,
            data: null,
          });
        } else {
          return res.status(201).json({
            message: "ordonnance modifie",
            data: req.body,
          });
        }
      }
    );
  },

  //delete
  deleteordonnance: (req, res) => {
    Ordonnance.findOneAndDelete({ _id: req.params.id }, (err, Ordonnance) => {
      if (!Ordonnance) {
        return res.status(500).json({
          message: "aucune ordonnance" + err,
          data: null,
        });
      } else {
        return res.status(201).json({
          message: " ordonance supprime",
          data: null,
        });
      }
    });
  },
};
