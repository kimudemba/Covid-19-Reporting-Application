const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/items', { useNewUrlParser: true})
  .catch(e => {
    console.error('Connection error', e.message);
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