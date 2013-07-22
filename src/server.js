var EventEmitter = require('events').EventEmitter
  , ee = new EventEmitter()
  , mongo = require('mongodb').MongoClient
  , ObjectID = require('mongodb').ObjectID
  , util = require('util')
  , express = require('express')
  , mod_com = require('./lib/msgmanager')
  , socketio = require('socket.io')
  ;

var app = express();
var server = app.listen(3000);
var io = socketio.listen(server);

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

  // var com = mod_com.init();
  // var msg = {
  //   type: 'test',
  //   value: 'gold'
  // };
  // com.send(msg, function(data){
  //   debugger;
  // });

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

app.get('/targets/:id/results', function(req, res){
  var thisId = req.params.id;
  // var o_id = new ObjectID(thisId);

  mongo.connect('mongodb://127.0.0.1:27017/wbm', function(err, db){
    if(err) throw err;

    var collection = db.collection('results');

    collection.find({target_id: thisId}).toArray(function(err, results){
      if(err) throw err;

      res.json({
        success: true,
        // dirty....
        results: JSON.parse(JSON.stringify(results))
      }, 200);
    })
  });
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

    var update = req.body;

    collection.findAndModify({
      _id: o_id
    }, [['_id', 'asc']], {
      $set : {
        enabled: update.enabled,
        poll_freq_sec: update.poll_freq_sec
      }
    }, {
      // return the updated doc rather than the orig
      new: true
    }, function(err, doc){
      db.close();

      if(err){
        throw err;
        res.json({success: false, errorMsg: err }, 500);
      } else {
        debugger;
        util.log('updated target ' + thisId + ' record');
        res.json({success: true, doc: doc}, 200);

        debugger;
        var com = mod_com.init();
        var msg = {
          type: 'confUpdate',
          value: doc
        };
        com.send(msg, function(data){
          debugger;
        });
      };
    });

    // collection.update({_id: o_id}, {
    //   $set: {enabled: req.body.enabled}
    // }, {}, function(err, modCount){
    //   db.close();
    //   if(err) {
    //     throw err;
    //     res.json({success: false, errorMsg: err }, 500);
    //   } else {
    //     util.log('updated ' + modCount + ' records');
    //     res.json({success: true}, 200);

    //     var com = mod_com.init();
    //     var msg = {
    //       type: 'confUpdate',
    //       value: {_id: thisId, enabled: req.body.enabled}
    //     };
    //     com.send(msg, function(data){
    //       debugger;
    //     });
    //   };
    // });
  });
});

app.get('/results', function(req, res){
  debugger;
});

io.sockets.on('connection', function(socket){
  debugger;
  socket.emit('news', {hello: 'world'});
  socket.on('joined', function(targetId){
    socket.join(targetId);
  });
});

// if(!module.parent){
//   app.listen(process.env.PORT || 3000);
//   util.log('Web server started');
// };
