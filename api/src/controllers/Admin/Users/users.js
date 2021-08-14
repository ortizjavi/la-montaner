const User = require("../../../models/Users/User");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  },
};
