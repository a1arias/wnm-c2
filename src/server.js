var EventEmitter = require('events').EventEmitter
  , ee = new EventEmitter()
  , mongo = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID
  , util = require('util')
  , express = require('express')
  , mod_com = require('./lib/msgmanager')
  ;

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

  var com = mod_com.init();
  var msg = {
    type: 'test',
    value: 'gold'
  };
  com.send(msg, function(data){
    debugger;
  });

  res.render('index');
  // render the webmin portal
});

app.get('/targets', function(req, res){
  // get all targets
  var self = this;

  mongo.connect('mongodb://127.0.0.1:27017/wbm', function(err, db){
    if(err) throw err;

    var collection = db.collection('listToPoll');

    collection.find().toArray(function(err, result){
      db.close();

      res.json(result);
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

app.patch('/targets/:id', function(req, res){
  debugger;
  var thisId = req.params.id;
  var o_id = new ObjectID(thisId);

  mongo.connect('mongodb://127.0.0.1:27017/wbm', function(err, db){
    if(err) throw err;

    var collection = db.collection('listToPoll');

    debugger;
    collection.update({_id: o_id}, {
      $set: {enabled: req.body.enabled}
    }, {}, function(err, modCount){
      db.close();
      if(err) {
        throw err;
        res.json({success: false, errorMsg: err }, 500);
      } else {
        util.log('updated ' + modCount + ' records');
        res.json({success: true}, 200);

        var com = mod_com.init();
        var msg = {
          type: 'confUpdate',
          value: {_id: thisId, enabled: req.body.enabled}
        };
        com.send(msg, function(data){
          debugger;
        });
      };
    });
  });
});

app.get('/results', function(req, res){
  debugger;
});

if(!module.parent){
  app.listen(process.env.PORT || 3000);
  util.log('Web server started');
};
