const config = require('./lib/config');
const cors = require("cors");
const express = require('express');
const apiRouter = require("./controllers/api.js");
const { randomHash } = require("./lib/random-hash.js");
const { useMongo } =  require('./models/mongo.js');
const { usePostgres } = require("./models/postgres.js");

const HASH_LENGTH = 10;

const app = express();

// middleware to process common data types
app.use(cors());
app.use(express.json());
app.use(express.raw({ limit: "1mb" }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('dist'));
app.use('/api', apiRouter);

// temporary: to stop the stupid browser favicon requests from messing up console.logs
app.get('/favicon.ico', (req, res) => {
  res.status(404).send();
});

// path for accepting all request types
app.all('/:binName', async (req, res, next) => {
  try {
    const binName = req.params.binName;
    const bin = await usePostgres.findBinByName(binName);
    if (!bin) throw new Error('Bin not found');

    const binId = bin.id;
    const hash = randomHash(HASH_LENGTH);
    const newRequest = {
      hash: hash,
      headers: req.headers,
      body: req.body
    };

    const pgRequest = usePostgres.insertRequest(binId, req.method, req.path, hash);
    const mongoRequest = useMongo.put(newRequest);
    await Promise.all([pgRequest, mongoRequest])
      .catch(_err => { throw new Error('Request could not be saved') });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
})

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(400).send({ error: err.text });
}

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
})