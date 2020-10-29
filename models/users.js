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

    //function to add new user
    const add = async (name, email, usertype, key) => {
        const results = await db.add(COLLECTION, {
            name: name,
            email: email,
            usertype: usertype,
            key: key,
        });

        return results.result;
    };

    //function to get password
    const getKey = async (key) => {
        if (!key) {
            console.log(`01: missing key`);
            return null;
        };

        const users = await db.get(COLLECTION, { key });

        if (users.length !== 1) {
            console.log('02: Bad key');
        };

        return users[0];
    }

    return {
        get,
        add,
        getKey
    };

};