const apiRouter = require("express").Router();
const pgQuery = require("../lib/db-query");
const { useMongo } = require("../models/mongo");

// /api/requests
apiRouter.get('/:binName/requests', async (req, res) => {
  
  // get shtuff from pg
  const pgResult = await pgQuery('select * from requests')
  // console.log('rows are', pgResult.rows)

  // for each pgResult, get the associated mongo data
  // and append to obj
  // I think this'll be slow but should work
  let results = pgResult.rows
  // console.log(typeof results)
  // console.log('results', results)
  const allRequests = []

  let getAllList = await useMongo.getAll()
  console.log('getAllList', getAllList)

  // results.forEach(async result => {
  //   console.log(result.id);
  //   let valuesToAdd = await useMongo.getOne(result.id)
  //   console.log('values to add', valuesToAdd);
  //   console.log(valuesToAdd.constructor)
  //   // valuesToAdd = new Object(valuesToAdd) ???

  //   result.headers = valuesToAdd.header // these too?
  //   result.body = valuesToAdd.body

  //   allRequests.push(result)
  // });
  
  return allRequests
});

// apiRouter.get('/:binName/:requestId', (req, res) => {
//   const requestId = req.params.requestId
//   const requestData = useMongo.getOne(requestId)

// // assuming request data is an object 
//   return requestData
// });

module.exports = apiRouter;