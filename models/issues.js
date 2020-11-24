const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
  //function to get the issues by number
  const get = async (slugtitle = null) => {
    try {
      if (!slugtitle) {
        const everyIssue = await db.get(COLLECTION);
        return { everyIssue };
      }
      const everyIssue = await db.get(COLLECTION, { slugtitle });
      return { everyIssue };
    } catch (err) {
      return {
        err,
      };
    }
  };

  //function to get the issues by project
  const getByProject = async (slugtitle) => {
    try {
      let expression = new RegExp(slugtitle);
      const byProject = await db.get(COLLECTION, { slugtitle: expression });
      return byProject;
    } catch (err) {
      return {
        err,
      };
    }
  };

  //function to add a new slug
  const add = async (slugtitle, title, description, status, project_id) => {
    //I should not be able to add any item without all the fields
    if (!slugtitle || !title || !description || !status || !project_id) {
      return {
        err: 'one of the fields are empty',
      };
    }
    try {
      const counter = await db.count(COLLECTION);
      const results = await db.add(COLLECTION, {
        slugtitle: `${slugtitle}-${counter + 1}`,
        title: title,
        description: description,
        status: status,
        project_id: new ObjectID(project_id),
        comments: [],
      });
      return results;
    } catch (err) {
      return {
        err,
      };
    }
  };

  return {
    get,
    add,
    getByProject,
  };
};
