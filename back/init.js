// This is a script file to initialize the MongoDb database
db = connect('mongodb://localhost/projdb');

db.requests.insertMany([
  {
    request_id: "tmp",
    request_headers: {
      'Content-Type': 'text',
      'host': 'some.host',
    },
    request_body: {
      "id": 1231232,
      "kind": "test_content"
    }
  },
  {
    request_id: "tmp2",
    request_headers: {
      'Content-Type': 'text',
      'host': 'some.host2',
    },
    request_body: {
      "id": 999932,
      "kind": "test_content2"
    }
  }
]);
