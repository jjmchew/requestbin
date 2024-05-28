# Back-end notes

## May 27, 2024 (James notes)
- setup local mongodb instance using docker
  - tried a few different approaches (i.e,. using script files for a `docker run` and then manually adding initial db content)
  - final approach was to use `docker-compose.yml`, which allowed automatically running `init.js` initial script file to pre-populate the mongodb with initial data
    - this step may not be necessary, but was included to help test the "getAll" function
- incorporated use of a `.env` file for mongodb root user / password, and localhost (may be necessary for ngrok)
- created an importable "module" for mongoDb: `mongo.js`
- created a test file: `testMongo.js` which imports the module and runs both included functions

TO DOs:
- need to combine with rest of backend currently in repo branch 'setup-express-server'
- need to setup project to be able to test mongo with ngrok
- need to confirm if mongo db can be deployed on vps for production

