const projects = require('../models/projects')();

module.exports = () => {
  // function (route) to get the users
  const getUserController = async (req, res) => {
    const { everySlug, err } = await projects.get();
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(everySlug);
  };
  // function (route) to get the users by project
  const getSlug = async (req, res) => {
    const { everySlug, err } = await projects.get(req.params.slug);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(everySlug);
  };
  // function (route) to add a new project
  const postController = async (req, res) => {
    let slug = req.body.slug;
    let name = req.body.name;
    let description = req.body.description;

    const { results, err } = await projects.add(slug, name, description);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(results);
  };

  return {
    getUserController,
    getSlug,
    postController,
  };
};
