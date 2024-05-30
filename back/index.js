const config = require('./lib/config');
const cors = require("cors");
const express = require('express');
const apiRouter = require("./controllers/api.js");
const { useMongo } =  require('./models/mongo.js');
const { usePostgres } = require("./models/postgres.js");

const app = express();

// middleware to process common data types
app.use(cors());
app.use(express.json());
app.use(express.raw({ limit: "1mb" }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  // res.redirect -> /public/welcome.html
  res.redirect('/public/welcome.html')
});

// temporary: to stop the stupid browser favicon requests from messing up console.logs
app.get('/favicon.ico', (req, res) => {
  res.status(404).send();
});

// path for accepting all request types
app.all('/:binName', async (req, res, next) => {
  try {
    const binName = req.params.binName;
    const bin = await usePostgres.findBinByName(binName);

    const binId = bin.id;
    const newRequestId = await usePostgres.insertRequest(binId, req.method, req.path);

    const newRequest = {
      request_id: newRequestId,
      headers: req.headers,
      body: req.body
    };

    await useMongo.put(newRequest);
    res.status(200).send();
  } catch (error) {
    next('Bin not found or bad request');
  }
})

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(400).send(err);
}

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
})