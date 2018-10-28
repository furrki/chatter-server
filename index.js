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



var app = express();

 require('express-dynamic-helpers-patch')(app);
app.disable('view cache');
// Serve static assets from the /public folder

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser());
// Serve the Parse API on the /parse URL prefix

// Parse Server plays nicely with the rest of your web routes


app.use(cookieParser());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
}));


User = require("./models/User.js")
Message = require("./models/Message.js")


app.get('*', function(req, res, next) {
    next();
});

function ensureAuthenticated(req, res, next){
    if(!req.session.user){
        res.redirect('/');
    }
    return next();
}
app.dynamicHelpers({
    islogged: function(req, res){
        return req.session.user !== undefined;
    }
});
var indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

var userRoutes = require('./routes/user');
app.use('/user', userRoutes);


var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/ProjectMars',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey:  'MASTER_KEY', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
      classNames: []
    }
});

var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);


var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
