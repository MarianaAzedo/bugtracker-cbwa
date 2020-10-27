const db = require('../db')();
const ObjectID = require('mongodb').ObjectID;
const COLLECTION = 'issues';

module.exports = () => {
    //function to get the issues by number
    const get = async (slugtitle = null) => {
        if (!slugtitle) {
            const everyIssue = await db.get(COLLECTION);
            return everyIssue;
        }
        const oneIssue = await db.get(COLLECTION, { slugtitle });
        return oneIssue;
    };

    //function to get the issues by project ** is not working
    const getByProject = async (slugtitle) =>{
        let expression = new RegExp(slugtitle);
        const byProject = await db.get(COLLECTION, {slugtitle: expression});
        return byProject;
    };

    const add = async (slugtitle, title, description, status, project_id) => {
        const counter = await db.count(COLLECTION);
        const results = await db.add(COLLECTION, {
            slugtitle: `${slugtitle}-${counter + 1}`,
            title: title,
            description: description,
            status: status,
            project_id: new ObjectID(project_id),
            comments: []
        });

        return results.result;
    };

    return {
        get,
        add,
        getByProject
        
    };

};