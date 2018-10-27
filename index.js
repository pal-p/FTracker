require('dotenv').config(); // Sets up dotenv as soon as our application starts

const express = require('express'); 
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const http = require('http');
const app = express();
const mongoose = require("mongoose");
const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment.trim()];
const connUri = process.env.MONGO_LOCAL_CONN_URL;
const userRoutes = require('./routes/user');
const indexRoutes = require('./routes/index');
const httpServer = http.createServer(Cookies.express());

//connect database
mongoose.connect(connUri,{ useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//set public directory for css, images etc...
app.use(express.static(__dirname + '/public'));
//view engine is set to ejs
app.set('view engine', 'ejs');
if (environment !== 'production') {
  app.use(logger('dev'));
}
//Routes 
app.use('/user', userRoutes);
app.use('/', indexRoutes);

//Server starts listening
app.listen(`${stage.port}`, () => {
  console.log(`Server now listening at localhost:${stage.port}`);
});

