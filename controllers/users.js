const users = require('../models/users')();

module.exports = () => {
  // function (route) to get the users
  // Error message
  const getUserController = async (req, res) => {
    const { user, err } = await users.get();
    console.log('here it goes our error ' + err);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(user);
  };

  // function (route) to get the users by email
  const getUserEmail = async (req, res) => {
    const { user, err } = await users.get(req.params.email);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(user);
  };

  // function (route) to add new user
  const postController = async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let usertype = req.body.usertype;
    let key = req.body.key;

    const { result, err } = await users.add(name, email, usertype, key);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(result);
  };

  return {
    getUserController,
    getUserEmail,
    postController,
  };
};
