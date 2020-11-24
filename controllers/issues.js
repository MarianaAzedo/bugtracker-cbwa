const issues = require('../models/issues')();

module.exports = () => {
  // function (route) to get the issues
  const getUserController = async (req, res) => {
    const { everyIssue, err } = await issues.get();
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(everyIssue);
  };
  // function (route) to get the issues by Number
  const getIssue = async (req, res) => {
    const { everyIssue, err } = await issues.get(req.params.slug);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(everyIssue);
  };
  // function (route) to get the issues by Project
  const getByProject = async (req, res) => {
    const { everyIssue, err } = await issues.getByProject(req.params.slug);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(everyIssue);
  };

  const postController = async (req, res) => {
    let slugtitle = req.params.slugtitle;
    let title = req.body.title;
    let description = req.body.description;
    let project_id = req.body.project_id;

    const { results, err } = await issues.add(
      slugtitle,
      title,
      description,
      project_id,
    );
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(results);
  };

  return {
    getUserController,
    getIssue,
    postController,
    getByProject,
  };
};
