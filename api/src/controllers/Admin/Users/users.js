const User = require("../../../models/Users/User");

module.exports = {
  getUsersList: async (_req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  },
};
