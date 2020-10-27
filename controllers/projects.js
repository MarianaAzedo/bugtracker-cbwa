const projects = require('../models/projects')();

module.exports = () => {
    // function (route) to get the users
    const getUserController = async (req, res) => {
        res.json(await projects.get());
    };
    // function (route) to get the users by slug
    const getSlug= async (req, res) => {
        res.json(await projects.get(req.params.slug));
    };

    const postController = async (req, res) => {
        let slug = req.body.slug;
        let name = req.body.name;
        let description = req.body.description;
        

        const result = await projects.add(slug, name, description);
        res.json(result);
    }

    return {
        getUserController,
        getSlug,
        postController,
    };
};