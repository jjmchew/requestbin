const apiRouter = require("express").Router();
const { useMongo } = require("../models/mongo");
const { usePostgres } = require("../models/postgres");

apiRouter.post('/', async (req, res, next) => {
  // random 20 chars
  function randomName() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  }

  // make new bin w/name `binName`
  let binName = randomName();
  
  // save new bin to db
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

apiRouter.get('/:binName/requests/:requestId', async (req, res, next) => {
  try {
    const request = await useMongo.getOne(+req.params.requestId);
    if (!request) throw new Error();
    res.status(200).send(request);
  } catch (error) {
    next(error);
  }
});

function errorHandler(err, req, res, next) {
  res.status(404).send({ error: 'bad request' });
}

apiRouter.use(errorHandler)

module.exports = apiRouter;