const { MongoClient } = require('mongodb');
// const connectionString = 'mongodb://127.0.0.1:27017';
const connectionString = process.env.DATABASE_URL;
let db = null;

const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    const database = client.db('rumaisho');
    db = database;
    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
