const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
    const getAllComments = async (slugtitle) => {
        const PIPELINE = [
            {$match: {"slugtitle": slugtitle}},
            {$project: {
              comments: 1,
              _id: 0,
              slugtitle: 1
            }}
          ]

          const getComment = await db.aggregate(COLLECTION, PIPELINE);
          return getComment;
        };

        const getOneComment = async (commentId) =>{
            const PIPELINE = [
                {$match: {'comments._id': ObjectID(commentId)}},
                {$project: {
                  comments: {$filter: {
                    input: '$comments',
                    as: 'comment',
                    cond: {$eq: ['$$comment._id', ObjectID(commentId)]}
                  }},
                  _id: 0,
                  issueNumber: 1
                } }
              ]

              const comments = await db.aggregate(COLLECTION, PIPELINE);
              return comments;
        };


    const addComment = async (slugtitle, text, author) => {
        const PIPELINE = [{slugtitle: slugtitle}, {$push:{comments:{
            _id: new ObjectID(),
            text: text,
            author: author
        }}}]
        const results = await db.update(COLLECTION, PIPELINE);

        return results.result;
    };

    return {
        addComment,
        getAllComments,
        getOneComment
    };

};