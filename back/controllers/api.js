const apiRouter = require("express").Router();
const { randomHash } = require("../lib/random-hash");
const { useMongo } = require("../models/mongo");
const { usePostgres } = require("../models/postgres");

const BIN_NAME_LENGTH = 20;

apiRouter.post('/', async (req, res, next) => {
  const binName = randomHash(BIN_NAME_LENGTH);
  
  try {
    const result = await usePostgres.insertBin(binName);
    if (!result) throw new Error();
  } catch (error) {
    next(error);
    return;
  }

  let binNamePackage = JSON.stringify({ name: binName });
  res.status(200).send(binNamePackage);
})

apiRouter.get('/:binName/requests', async (req, res) => {
  try {
    const requests = await usePostgres.findAllRequestsByBinName(req.params.binName);
    res.status(200).send(requests);
  } catch (error) {
    next(error);
  }
});

apiRouter.get('/:binName/requests/:requestHash', async (req, res, next) => {
  try {
    console.log(req.params.requestHash);
    const request = await useMongo.getOne(req.params.requestHash);
    if (!request) throw new Error('Request not found');
    res.status(200).send(request);
  } catch (error) {
    next(error);
  }
});

function errorHandler(err, req, res, next) {
  res.status(404).send({ error: err.text });
}

apiRouter.use(errorHandler)

module.exports = apiRouter;