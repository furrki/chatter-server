// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var session = require('express-session')


var cookieParser = require('cookie-parser');
var ParseDashboard = require('parse-dashboard');
var bodyParser = require('body-parser');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/ProjectMars',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'MASTER_KEY', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed

});


var app = express();

app.disable('view cache');
// Serve static assets from the /public folder

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser());
// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
Parse.initialize("myAppId"); //PASTE YOUR Back4App APPLICATION ID
Parse.serverURL = 'http://localhost:1337/parse'


app.use(cookieParser());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }
}));
app.get('*', function(req, res, next) {

    next();

});

function ensureAuthenticated(req, res, next){
    if(!req.session.user){
        res.redirect('/');
    }
    return next();
}

var indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

var userRoutes = require('./routes/user');
app.use('/user', userRoutes);

var economyRoutes = require('./routes/economy');
app.use('/economy', economyRoutes);



var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

/*
var cron = require('cron');
var cronJob = cron.job("5 * * * * * *", function(){
    // perform operation e.g. GET request http.get() etc.
    console.info('cron job completed');
});
cronJob.start();
*/
