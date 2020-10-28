const db = require('../db')();
const COLLECTION = 'projects';

//function to get the task
module.exports = () => {
    const get = async (slug = null) => {
        if (!slug) {
            const everySlug = await db.get(COLLECTION);
            return everySlug;
        }
        const oneSlug = await db.get(COLLECTION, { slug });
        return oneSlug;
    };

    //function to add the task
    const add = async (slug, name, description) => {
        const results = await db.add(COLLECTION, {
            slug: slug,
            name: name,
            description: description,
        });

        return results.result;
    };

    return {
        get,
        add,
    };

};