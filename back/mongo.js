import { MongoClient } from 'mongodb';

const uri = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.LOCAL_MONGO_HOST}:27017/projdb?authSource=admin`;
const mongo = new MongoClient(uri);

const getAll = async () => {
  await mongo.connect();
  const collection = mongo.db('projdb').collection('requests');

  let list = await collection.find().toArray();

  await mongo.close();
  return list;
}

const put = async (newObj) => {
  await mongo.connect();
  const collection = mongo.db('projdb').collection('requests');

  await collection.insertOne(newObj);
  console.log(`inserted ${newObj} into mongoDb`);
  await mongo.close();
}


const useMongo = {
  getAll,
  put
};

export { useMongo };
