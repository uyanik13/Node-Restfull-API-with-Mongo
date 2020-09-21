'use strict'
const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

mongoose.connect(config.db, (error, res) =>{
  if(error){
    return console.log(`Error connecting to database: ${error}` );
  }
  console.log("Connection to the correct database");  

  app.listen(config.port, () => {
    console.log(`Rest API Running on  http://localhost:${config.port}`);
  });
});
