const issues = require('../models/issues')();

module.exports = () => {
    // function (route) to get the issues
    const getUserController = async (req, res) => {
        res.json(await issues.get());
    };
    // function (route) to get the issues by Number
    const getIssue = async (req, res) => {
        res.json(await issues.get(req.params.slug));
    };
    // function (route) to get the issues by Project
    const getByProject = async (req, res) => {
        res.json(await issues.getByProject(req.params.slug));
    };
    
    const postController = async (req, res) => {
        let slugtitle = req.params.slugtitle;
        let title = req.body.title;
        let description = req.body.description;
        let project_id = req.body.project_id;

        const result = await issues.add(slugtitle, title, description, project_id);
        res.json(result);
    };

    return {
        getUserController,
        getIssue,
        postController,
        getByProject
    };
};