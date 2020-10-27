const users = require('../models/users')();

module.exports = () => {
    // function (route) to get the users
    const getUserController = async (req, res) => {
        res.json(await users.get());
    };
    // function (route) to get the users by email
    const getUserEmail = async (req, res) => {
        res.json(await users.get(req.params.email));
    };

    const postController = async (req, res) => {
        let name = req.body.name;
        let email = req.body.email;
        let usertype = req.body.usertype;
        let key = req.body.key;

        const result = await users.add(name, email, usertype, key);
        res.json(result);
    }

    return {
        getUserController,
        getUserEmail,
        postController,
    };
};