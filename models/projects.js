const db = require('../db')();
const COLLECTION = 'projects';

//function to get the task
module.exports = () => {
  const get = async (slug = null) => {
    try {
      if (!slug) {
        const everySlug = await db.get(COLLECTION);
        return { everySlug };
      }
      const everySlug = await db.get(COLLECTION, { slug });
      return { everySlug };
    } catch (err) {
      return {
        err,
      };
    }
  };

  //function to add the task
  const add = async (slug, name, description) => {
    //I should not be able to add any item without all the fields
    if (!slug || !name || !description) {
      return {
        err: 'one of the fields are empty',
      };
    }

    try {
      //I should not be able to duplicate projects based on SLUG
      const everySlug = await db.get(COLLECTION, { slug });
      if (everySlug.length > 0) {
        return {
          result: 'Project already exist',
        };
      }

      const results = await db.add(COLLECTION, {
        slug: slug,
        name: name,
        description: description,
      });

      return { results };
    } catch (err) {
      return {
        err,
      };
    }
  };

  return {
    get,
    add,
  };
};
