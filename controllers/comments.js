const comments = require('../models/comments')();

module.exports = () => {
  // function (route) to get the comments
  const getAll = async (req, res) => {
    const { getComment, err } = await comments.getAllComments(
      req.params.slugtitle,
    );
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(getComment);
  };
  // function (route) to get the comment by ID
  const getComment = async (req, res) => {
    const { comment, err } = await comments.getOneComment(req.params.commentId);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(comment);
  };
  // function (route) to add comment
  const postComment = async (req, res) => {
    let slugtitle = req.params.slugtitle;
    let text = req.body.text;
    let author = req.body.author;

    const { results, err } = await comments.addComment(slugtitle, text, author);
    if (err) {
      res.status(500).json({
        err,
      });
    }
    res.json(results);
  };

  return {
    getAll,
    getComment,
    postComment,
  };
};
