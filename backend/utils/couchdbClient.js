require('dotenv').config();
const nano = require('nano');

const couch = nano(process.env.COUCHDB_URL);
module.exports = couch;
