const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');

const url = process.env.DATABASE_ACCESS;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connection estabislished with MongoDB');
  })
  .catch(e => {
    console.error('CONNECTION ERROR IS:', e.message);
  });

const db = mongoose.connection;

module.exports = db;
//test

//i have the connection made and data has been transferred into the database
//now what?

//how to create tables within mongodb

//explaining the connection between router.js and the database
//because im not sure on its connection

//a lot of guides have said to use the .env file and im not sure
//what that is
