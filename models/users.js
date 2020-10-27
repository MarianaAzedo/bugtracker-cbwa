const db = require('../db')();
const COLLECTION = 'users';

//function to return only the registered email data
module.exports = () => {
    const get = async (email = null) => {
        if (!email) {
            const everyUsers = await db.get(COLLECTION);
            return everyUsers;
        }
        const oneUser = await db.get(COLLECTION, { email });
        return oneUser;
    };

    const add = async (name, email, usertype, key) => {
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: usertype,
            key: key,
        });

        return results.result;
    };

    return {
        get,
        add,
    };

};