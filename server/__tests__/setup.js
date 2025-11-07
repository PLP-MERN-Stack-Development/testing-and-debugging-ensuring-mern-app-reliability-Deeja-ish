const mongoose = require('mongoose');
const Bug = require('../models/Bug'); 

beforeAll(async () => {
  process.env.NODE_ENV = 'test';

  // Use the test database URI
  const uri = process.env.MONGO_URI_TEST;
  if (!uri) {
    throw new Error('MONGO_URI_TEST not set in .env file');
  }

  await mongoose.connect(uri);
});

// Clear the database after each test
afterEach(async () => {
  await Bug.deleteMany({});
});

// Disconnect after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});