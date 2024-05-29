const config = require("../lib/config")
const { MongoClient } = require('mongodb');

const uri = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/requestbin`;
const mongo = new MongoClient(uri);

const getAll = async () => {
  await mongo.connect();
  const collection = mongo.db('requestbin').collection('requests');

  let list = await collection.find().toArray();

  await mongo.close();
  return list;
}

const put = async (newObj) => {
  await mongo.connect();
  const collection = mongo.db('requestbin').collection('requests');

  await collection.insertOne(newObj);
  await mongo.close();
}

const getOne = async (requestId) => {
  await mongo.connect();
  const collection = mongo.db('requestbin').collection('requests');

  let request = await collection.findOne({ request_id: requestId });
  await mongo.close();
  return request
}


const useMongo = {
  getOne,
  getAll,
  put
};

module.exports = { useMongo };
