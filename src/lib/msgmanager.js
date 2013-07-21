zmq = require('zmq')
  , comSock = zmq.socket('dealer')
  , comAddress = 'tcp://127.0.0.1:5658'
  , util = require('util')
  ;
  
exports.init = function(){
  MsgManager = exports.MsgManager = function(){
    comSock.connect(comAddress);
    util.log('com online ')
  };
  MsgManager.prototype.send = function(obj, cb){
    if(typeof(obj) == 'object'){
      if(obj.type != undefined && obj.value != undefined){
        var msg = JSON.stringify(obj);
        comSock.send(msg);
        comSock.once('message', function(data){
          var data = JSON.parse(data);
          cb(data);
        });
      };
    };
  };
  return new MsgManager();
};