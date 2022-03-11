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
