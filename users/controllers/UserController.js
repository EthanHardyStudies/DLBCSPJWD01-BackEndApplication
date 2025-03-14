const UserModel = require("./../../common/models/User");

module.exports = {
  getUser: (req, res) => {
    const userId = req.params.id;
    UserModel.findUser({ id: userId })
    .then((user) => {
      return res.status(200).json({
        status: true,
        data: user.toJSON(),
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
  },

  updateUser: (req, res) => {
    const userId = req.query.id;
    var payload = req.body;
    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the user.",
        },
      });
    }

    UserModel.updateUser(userId, payload)
      .then(() => {
        var ObjectId = require('mongodb').ObjectId; 
        var o_id = new ObjectId(userId)
        return UserModel.findUser({_id:o_id});
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteUser: async (req, res) => {
    const userId = req.params.id;
    UserModel.deleteUser({ id: userId })
    .then((numberOfEntriesDeleted) => {
      return res.status(200).json({
        status: true,
        data: {
          numberOfUsersDeleted: numberOfEntriesDeleted
        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        error: err,
      });
    });
  }
};
