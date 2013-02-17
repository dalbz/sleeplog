
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , MongoStore = require('express-session-mongo');;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){

  // views
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  // session support
  app.use(express.cookieParser());

  // todo - put the secret key in a config file
  app.use(express.session({ secret: 'secret'
                            , store: new MongoStore()
                            , expires: new Date(Date.now() + 86400 * 1000) }));

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compiler({ src : __dirname + '/public', enable: ['less']}));
  app.use(app.router);

  app.use(express.static(__dirname + '/public'));

});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Compatible

// Now less files with @import 'whatever.less' will work(https://github.com/senchalabs/connect/pull/174)
var TWITTER_BOOTSTRAP_PATH = './vendor/twitter/bootstrap/less';
express.compiler.compilers.less.compile = function(str, fn){
  try {
    var less = require('less');var parser = new less.Parser({paths: [TWITTER_BOOTSTRAP_PATH]});
    parser.parse(str, function(err, root){fn(err, root.toCSS());});
  } catch (err) {fn(err);}
}

// Routes

app.get('/', routes.index);

app.post('/login', routes.login);

app.post('/register', routes.register);

app.get('/dash', routes.dash);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
