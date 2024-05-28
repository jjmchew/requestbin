const config = require('./lib/config');
const pgQuery = require('./lib/db-query.js');
const express = require('express');
const format = require("./lib/format.js");
const apiRouter = require("./controllers/api.js");
const useMongo =  require('./models/mongo.js');

const app = express();

// middleware to process common data types
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

  /*
  bin_id,
  method
  url
  path
  date_received
  time_received
  */

  // // format sql request
  const dateObj = format.date();
  const date = dateObj.date;
  const time = dateObj.time;
  const method = req.method;
  const path = req.path
  const url = req.headers.host + req.url;

  console.log(method, path, url);
  res.status(200).send(method, path, url);
  // // add metadata to sql requestTable
  // // Note, the requests table yet to be created
  // const insertRequest = "INSERT INTO requests (bin_id, date, time, method) VALUES ($1, $2, $3, $4)"
  // let insertResult = await pgQuery(insertRequest, binId, date, time, method)


  // // ?? How do you grab the id(pk of req in sql reqs table) for immediate use in creating the entires in mongo db?
  // // untested
  // const requestId = insertRequest.insertedId

  // // using the request_id from sql
  //   // send the request data to rawrs mongo collection
  //   // request_headers_body 
  //       // parse the headers
  //       // parse the body
  //       // add to mongo
  //           // {req_id: xxx, headers: {...}, body: {...}}
  
  // // const requestObj = {request_id: requestId, headers: req.headers , body: req.body}
  // // useMongo.put(requestObj)
  
  // res.send({
  //   requestId
  // });
})

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(400).send(err);
}

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
})