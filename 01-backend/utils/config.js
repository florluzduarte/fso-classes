require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST_URI
    : process.env.MONGODB_URI;

const MONGO_TEST_URI = process.env.MONGO_TEST_URI;

module.exports = { PORT, MONGO_URI, MONGO_TEST_URI };
