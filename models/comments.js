const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

//function to get all the comments
module.exports = () => {
  const getAllComments = async (slugtitle) => {
    try {
      const PIPELINE = [
        { $match: { slugtitle: slugtitle } },
        {
          $project: {
            comments: 1,
            _id: 0,
            slugtitle: 1,
          },
        },
      ];

      const getComment = await db.aggregate(COLLECTION, PIPELINE);
      return { getComment };
    } catch (err) {
      return {
        err,
      };
    }
  };

  //function to get one comment by ID
  const getOneComment = async (commentId) => {
    try {
      const PIPELINE = [
        { $match: { 'comments._id': ObjectID(commentId) } },
        {
          $project: {
            comments: {
              $filter: {
                input: '$comments',
                as: 'comment',
                cond: { $eq: ['$$comment._id', ObjectID(commentId)] },
              },
            },
            _id: 0,
            issueNumber: 1,
          },
        },
      ];

      const comment = await db.aggregate(COLLECTION, PIPELINE);
      return { comment };
    } catch (err) {
      return {
        err: err.message,
      };
    }
  };

  // function to add comment
  const addComment = async (slugtitle, text, author) => {
    //I should not be able to add any item without all the fields
    if (!slugtitle || !text || !author) {
      return {
        err: 'one of the fields are empty',
      };
    }
    try {
      const PIPELINE = [
        { slugtitle: slugtitle },
        {
          $push: {
            comments: {
              _id: new ObjectID(),
              text: text,
              author: author,
            },
          },
        },
      ];
      const results = await db.update(COLLECTION, PIPELINE);

      return results.result;
    } catch (err) {
      return {
        err,
      };
    }
  };

  return {
    addComment,
    getAllComments,
    getOneComment,
  };
};
