const config = require("../lib/config")
const { MongoClient } = require('mongodb');

const uri = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/projdb`;
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

const getOne = async (requestId) => {
  await mongo.connect();
  const collection = mongo.db('projdb').collection('requests');

  let request = await collection.findOne({request_id: requestId});
  return request
}


const useMongo = {
  getOne,
  getAll,
  put
};

module.exports = { useMongo };
