const { MongoClient } = require('mongodb');
const docs = require('../datas/users');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// const uri = 'mongodb://localhost:27017';
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('rumaisho');
    const users = database.collection('users');

    const option = { ordered: true };
    const result = await users.insertMany(docs, option);

    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
