const pgQuery = require("../lib/db-query");

async function findBinByName(binName) {
  const GET_BIN = "SELECT * FROM bins WHERE name = $1";
  const result = await pgQuery(GET_BIN, binName);
  
  if (result.rows.length === 0) return null;
  return result.rows[0];
}

async function insertRequest(binId, method, path, hash) {
  const INSERT_REQUEST = 'INSERT INTO requests (bin_id, method, path, hash) ' +
                         'VALUES ($1, $2, $3, $4)';
  const result = await pgQuery(INSERT_REQUEST, binId, method, path, hash);

  return result.rowCount === 1;
}

async function insertBin(binName) {
  const INSERT_BIN = 'INSERT INTO bins (name) VALUES ($1) RETURNING name';
  const result = await pgQuery(INSERT_BIN, binName);

  if (result.rows.length === 0) return null;
  return result.rows[0].name;
}

async function findAllRequestsByBinName(binName) {
  const PG_GET_REQUESTS = 'SELECT r.hash, r.method, r.path, datetime_received ' +
                          'FROM bins INNER JOIN requests AS r ' +
                          'ON bins.id = r.bin_id ' +
                          'WHERE bins.name = $1';

  const result = await pgQuery(PG_GET_REQUESTS, binName);
  return result.rows;
}

const usePostgres = {
  findBinByName,
  insertRequest,
  insertBin,
  findAllRequestsByBinName,
};

module.exports = {
  usePostgres
};