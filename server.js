var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

mongoose.connect('mongodb://demo:demo@ds039960.mongolab.com:39960/fakeschool'); 

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from HTML forms
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(session({ secret: 'demo' })); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in session


//================ROUTES==================================================
app.use('/api/master',require('./app/routes/master.js'));
app.use('/api/admin',require('./app/routes/admin.js'));
app.use('/api/student', require('./app/routes/student.js'));

require('./app/passport.js')(passport);
require('./app/routes/views.js')(app,passport);
//===================START SERVER=========================================
app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log('Server running on port: ' + port);
