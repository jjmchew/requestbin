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

const getOne = async (requestHash) => {
  await mongo.connect();
  const collection = mongo.db('requestbin').collection('requests');

  let request = await collection
    .findOne({ hash: requestHash }, { projection: { _id: 0 }});
  await mongo.close();
  return request;
}


const useMongo = {
  getOne,
  getAll,
  put
};

module.exports = { useMongo };
