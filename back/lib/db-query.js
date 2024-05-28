const config = require("./config");
const { Client } = require("pg");

const CONNECTION = {
  connectionString: config.DATABASE_URL,
  ssl: config.NODE_ENV === "production" ? { rejectedUnauthorized: false } : false,
};

module.exports = async function pgQuery(statement, ...parameters) {
  let client = new Client(CONNECTION);

  await client.connect();
  let result = await client.query(statement, parameters);
  await client.end();

  return result;
}