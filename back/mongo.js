// const { MongoClient } = require('mongodb');
import { MongoClient } from 'mongodb';

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.LOCAL_MONGO_HOST}:27017/projdb?authSource=admin`;
const mongo = new MongoClient(uri);

const getAll = async () => {
  await mongo.connect();
  const collection = mongo.db('projdb').collection('requests');

  let list = await collection.find().toArray();
  // console.log('mongo: ', JSON.stringify(list));

  await mongo.close();
  return list;
}

const put = async (newName) => {
  await mongo.connect();
  const collection = mongo.db('projdb').collection('requests');

  await collection.insertOne({ name: newName });
  // console.log(`inserted ${newName} into mongoDb`);
  await mongo.close();
}

async function main() {
  try {
    await getAll();
    await put('Jerry');
    console.log('===============')
    await getAll();
  } catch (e) {
    console.error(e);
  }
}

// console.log(process.env);
console.log(process.env.MONGO_USER, process.env.MONGO_PW, process.env.LOCAL_MONGO_HOST);
main();

const useMongo = {
  getAll,
  put
};

export { useMongo };
