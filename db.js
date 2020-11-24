const uri = process.env.MONGO_URI;
const MongoClient = require('mongodb').MongoClient;
const MONGO_OPTION = { useUnifiedTopology: true, useNewUrlParser: true };
const DB_NAME = 'bugtracker-cbwa';

module.exports = () => {
  //Function to connect to collect info in Mongo
  const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTION, (err, client) => {
        if (err) {
          console.log(err);
          return reject('Error cannot connect');
        }

        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.find(query).toArray((err, docs) => {
          if (err) {
            console.log(err);
            return reject('Error unexpected caracter');
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };

  //aggregate
  const aggregate = (collectionName, pipeline = []) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTION, (err, client) => {
        if (err) {
          console.log(err);
          return reject('Error cannot connect');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.aggregate(pipeline).toArray((err, docs) => {
          if (err) {
            console.log(err);
            return reject({ err: { message: 'Error on aggregate function' } });
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };

  //function to insert a new user individually
  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTION, (err, client) => {
        if (err) {
          console.log(err);
          return reject('Error cannot connect');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.insertOne(item, (err, result) => {
          if (err) {
            console.log(err);
            return reject('Error cannot insert');
          }
          resolve(result);
          client.close();
        });
      });
    });
  };

  //Count of the issue
  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTION, (err, client) => {
        if (err) {
          console.log(err);
          return reject('Error cannot connect');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.countDocuments({}, (err, result) => {
          if (err) {
            console.log(err);
            return reject('Error cannot count');
          }
          resolve(result);
          client.close();
        });
      });
    });
  };

  //function to insert add comments
  const update = (collectionName, pipeline) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, MONGO_OPTION, (err, client) => {
        if (err) {
          console.log(err);
          return reject('Error cannot connect');
        }
        const db = client.db(DB_NAME);
        const collection = db.collection(collectionName);
        collection.updateOne(pipeline[0], pipeline[1], (err, result) => {
          if (err) {
            console.log(err);
            return reject('Error cannot update');
          }
          resolve(result);
          client.close();
        });
      });
    });
  };

  return {
    get,
    add,
    count,
    update,
    aggregate,
  };
};
