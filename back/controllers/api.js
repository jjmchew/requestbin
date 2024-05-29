const apiRouter = require("express").Router();
const pgQuery = require("../lib/db-query");
const { useMongo } = require("../models/mongo");

// import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; // but switch to require?
// import Welcome from "./components/Welcome.js" // do we need to make it .tsx?

apiRouter.post('/', async (req, res) => {
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
  let binName = randomName()
  
  // save new bin to db
  const query = "INSERT INTO bins (name) VALUES ($1)" 
  let insertResult = await pgQuery(query, binName);

  // redirect user to /view/newBinName
  // res.redirect(`/view/${binName}`)
  let binNamePackage = JSON.stringify({ name: binName })
  res.status(200).send(binNamePackage)

  // need to return binName to construct path
})

apiRouter.get('/', (req, res) => {
  const data = [
    {
      id: 12,
      date_received: '12/02/1999',
      time_received: '08:24:33 UTC',
      method: 'GET',
      url: '/sample/get',
      path: '/request?id=3439',
      headers: { v1: 'sup', v2: 'k2', v3: 'k3', v4: 'k4'},
      body: 'asdfja;sdflkjas;lfaslm425ijh241l24;l5m l;lmn 2;lkm541l3 m;l4im;46',
    },
    {
      id: 13,
      date_received: '12/02/1999',
      time_received: '08:24:35 UTC',
      method: 'POST',
      url: '/sample/post',
      path: '/request?id=3439',
      headers: { v1: 'AYYYYY', oooooo: 'ahhhhh'},
      body: '81f6awe1r31av4we did itvvvv;lkm541l3 f',
    },
  ];
  res.status(200).send(JSON.stringify(data));
});

apiRouter.get('/:binName/requests', async (req, res) => {
  const PG_GET_REQUESTS = 'SELECT r.id, r.bin_id, ' +
                          'r.method, r.path, r.datetime_received ' +
                          'FROM bins INNER JOIN requests AS r ' +
                          'ON bins.id = r.bin_id ' +
                          'WHERE bins.name = $1';

  const pgResult = await pgQuery(PG_GET_REQUESTS, req.params.binName);
  res.status(200).send(pgResult.rows);
});

apiRouter.get('/:binName/requests/:requestId', async (req, res) => {
  const request = await useMongo.getOne(+req.params.requestId);
  res.status(200).send(request);
});

module.exports = apiRouter;