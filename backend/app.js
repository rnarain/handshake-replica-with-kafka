//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var passport = require('passport');

app.set('view engine', 'ejs');
require('dotenv').config();

const { mongoDB} = require('./config/configValues');



//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
// app.use(session({
//     secret              : 'cmpe273_kafka_passport_mongo',
//     resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration      :  5 * 60 * 1000
// }));

app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  //mongodb connection
  const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});




  app.use(express.json());
var accountRouter = require('./api/account/account.router');
var jobRouter = require('./api/job/job.router');
var eventRouter = require('./api/event/event.router');
var jobApplicationRouter = require('./api/jobApplication/jobApplication.router');
var studentRouter =  require('./api/student/student.router');
var messageRouter =  require('./api/message/message.router');
var companyRouter =  require('./api/company/company.router');




app.use('/api/account',accountRouter);
app.use('/api/student',studentRouter);
app.use('/api/message',messageRouter);
app.use('/api/company',companyRouter);



app.use('/api/event',eventRouter);
app.use('/api/job',jobRouter);
app.use('/api/jobApplication',jobApplicationRouter);

//start your server on port 3001
module.exports = app.listen(3001);
console.log("Server Listening on port 3001");