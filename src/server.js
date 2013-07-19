var zmq = require('zmq')
  , commSock = zmq.socket('pub')
  , EventEmitter = require('events').EventEmitter
  , ee = new EventEmitter()
  , bindAddress = 'tcp://127.0.0.1:5657'
  , MongoClient = require('mongodb')
  , util = require('util')
  , express = require('express')
  ;

ee.on('socket-bound', function(){
  util.log('comm socket bound');
  MongoClient.connect('mongodb://127.0.0.1:27017/wbm', function(err, db){
    if(err) throw err;

    var collection = db.collection('list');

    collection.find().toArray(function(err, result){
      db.close();
      ee.emit('conf-loaded', result);
    });
  });
});

ee.on('conf-loaded', function(conf){
  debugger;
  var payload = JSON.stringify(conf);
  util.log('conf loaded');
  commSock.send('conf ' + payload);
});

commSock.bind(bindAddress, function(err){
  if(err) throw err;
  ee.emit('socket-bound');
});

var app = module.exports = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
  debugger;

  res.render('index');
  // render the webmin portal
});

app.get('/targets', function(req, res){
  debugger;
  // get all targets
  var self = this;

  MongoClient.connect('mongodb://127.0.0.1:27017/wbm', function(err, db){
    if(err) throw err;

    var collection = db.collection('list');

    var targets;

    collection.find().toArray(function(err, result){
      db.close();
      res.json(self.targets);
    });
  });
});

app.get('/targets/:id', function(req, res){
  debugger;
  // get one target
});

app.post('/targets', function(req, res){
  debugger;
  // create one new target
});

app.get('/results', function(req, res){
  debugger;
});

if(!module.parent){
  app.listen(process.env.PORT || 3000);
  util.log('Web server started');
};
