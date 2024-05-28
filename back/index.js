const config = require('./lib/config');
const dbQuery = require('./lib/db-query.js');
const express = require('express');
const format = require("./format.js");

const app = express();

// middleware to process common data types
app.use(express.json());
app.use(express.raw({ limit: "1mb" }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// path for viewing the requests to a specific bin
app.get('/view/:binName', async (req, res) => {
  const binName = req.params.binName;
  const query = "SELECT * FROM bins WHERE name = $1";

  const result = await dbQuery(query, binName);
  const binId = result.rows.id

  const selectRequestsQuery = "SELECT * FROM requests WHERE bin_id = $1"
  const requestsResult = await dbQuery(selectRequestsQuery, binId)
  // create mongo query for headers and body

  // format the results and send to frontend. 

  res.send(result);
});

// path for accepting all request types
app.all('/:binName', async (req, res, next) => {

  // validate bin_id is in the bins table
    // if no, bad response
    // if yes, then, follow steps below

  const binName = req.params.binName;
  const query = "SELECT * FROM bins WHERE name = $1";
  const result = await dbQuery(query, binName);
  let binId;
  // if no matching bin found, go to error handling middleware
  if (!result.rows) {
    next();
  } else {
    binId = result.rows.id
  }
  

  // format sql request
  const dateObj = format.date();
  const date = dateObj.date;
  const time = dateObj.time;
  const method = req.method;

  // add metadata to sql requestTable
  // Note, the requests table yet to be created
  const insertRequest = "INSERT INTO requests (bin_id, date, time, method) VALUES $1, $2, $3, $4"
  let insertResult = await dbQuery(insertRequest, binId, date, time, method)


  // ?? How do you grab the id(pk of req in sql reqs table) for immediate use in creating the entires in mongo db?
  // untested
  const requestId = insertRequest.insertedId

  // using the request_id from sql
    // send the request data to rawrs mongo collection
    // request_headers_body 
        // parse the headers
        // parse the body
        // add to mongo
            // {req_id: xxx, headers: {...}, body: {...}}
  res.send({
    binName,
    date,
    time,
    method
  });
})

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
})