const config = require('./lib/config');
const pgQuery = require('./lib/db-query.js');
const cors = require("cors");
const express = require('express');
const apiRouter = require("./controllers/api.js");
const { useMongo } =  require('./models/mongo.js');

const app = express();

// middleware to process common data types
app.use(cors());
app.use(express.json());
app.use(express.raw({ limit: "1mb" }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api', apiRouter);

// path for accepting all request types
app.all('/:binName', async (req, res, next) => {
  const binName = req.params.binName;
  const query = "SELECT * FROM bins WHERE name = ($1)";
  const result = await pgQuery(query, binName).catch(error => next(error));

  if (result.rows.length === 0) {
    next();
    return;
  }

  let binId = result.rows[0].id

  const method = req.method;
  const path = req.path;

  const INSERT_REQUEST = "INSERT INTO requests (bin_id, method, path) VALUES ($1, $2, $3) RETURNING id";
  let insertResult = await pgQuery(INSERT_REQUEST, binId, method, path);
  const requestId = insertResult.rows[0].id
  
  const requestObj = {request_id: requestId, headers: req.headers , body: req.body}
  await useMongo.put(requestObj).catch(error => {
    next(error);
    return;
  })

  res.status(200);
})

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(400).send(err);
}

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
})