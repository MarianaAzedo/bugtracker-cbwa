const comments = require('../models/comments')();

module.exports = () => {
    // function (route) to get the comments
    const getAll = async (req, res)=>{
        res.json(await comments.getAllComments(req.params.slugtitle));
    };
    // function (route) to get the comment by ID
    const getComment = async (req, res)=>{
        res.json(await comments.getOneComment(req.params.commentId));
    };
    // function (route) to add comment
    const postComment = async (req, res) => {
        let slugtitle = req.params.slugtitle;
        let text = req.body.text;
        let author = req.body.author;

        const result = await comments.addComment(slugtitle, text, author);
        res.json(result);
    };

    return {
        getAll,
        getComment,
        postComment,
    };
};