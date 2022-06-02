const Groupe = require("../Models/Groupe");
const GroupeJou = require("../Models/GrpJou");

module.exports = {
    createGroupejur: (req, res) => {
        GroupeJou.create(req.body, (err, groupejou) => {
          if (err) {
            res.status(500).json({
              message: "order not created " + err,
              data: null,
            });
          } else {
            Groupe.findOneAndUpdate(
              { _id: req.body.groupe },
              { $push: { groupejous: groupejou._id } },
              (error, groupe) => {
                if (error) {
                  res.status(500).json({
                    message: "order added but not pushed in user  ",
                    data: null,
                  });
                } else {
                  res.status(200).json({
                    message: "order added and pushed in user  ",
                    data: null,
                  });
                }
              }
            );
          }
        });
      },
}