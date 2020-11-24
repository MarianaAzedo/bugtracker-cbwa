const db = require('../db')();
const COLLECTION = 'users';

//function to return only the registered email data
module.exports = () => {
  const get = async (email = null) => {
    try {
      if (!email) {
        const user = await db.get(COLLECTION);
        return { user };
      }
      const user = await db.get(COLLECTION, { email });
      return { user };
    } catch (err) {
      return {
        err,
      };
    }
  };

  //function to add new user
  const add = async (name, email, usertype, key) => {
    //I should not be able to add any item without all the fields
    if (!name || !email || !usertype || !key) {
      return {
        err: 'one of the fields are empty',
      };
    }
    try {
      //I should not be able to duplicate users (based on email)
      const user = await db.get(COLLECTION, { email });
      if (user.length > 0) {
        return {
          result: 'user name already exist',
        };
      }
      const results = await db.add(COLLECTION, {
        name: name,
        email: email,
        usertype: usertype,
        key: key,
      });
      return results.result;
    } catch (err) {
      return {
        err,
      };
    }
  };

  //function to get password
  const getKey = async (key) => {
    if (!key) {
      console.log(`01: missing key`);
      return null;
    }
    try {
      const users = await db.get(COLLECTION, { key });

      if (users.length !== 1) {
        console.log('02: Bad key');
      }

      return users[0];
    } catch (err) {
      return {
        err,
      };
    }
  };

  return {
    get,
    add,
    getKey,
  };
};
