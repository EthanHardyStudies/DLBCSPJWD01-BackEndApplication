const UserModel = require("../models/User");

module.exports = {
  has: (role) => {
    return (req, res, next) => {
      const {
        user: { userId },
      } = req;

      UserModel.findUserById(userId).then((user) => {
        // If user does not exist in our database, means something is fishy
        // Then we will return forbidden error and ask user to login again
        if (!user) {
          return res.status(403).json({
            status: false,
            error: "Invalid access token provided, please login again.",
          });
        }

        const userRole = user[0].role;

        // Check user has correct role
        if (userRole !== role) {
          return res.status(403).json({
            status: false,
            error: `You do not have ${role} access to this function`,
          });
        }

        next();
      });
    };
  },
};
