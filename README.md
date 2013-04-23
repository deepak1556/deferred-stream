# deferred-stream
===============

$.Deferred implementation based on streams. 

  * use streams to enhance combined promises.

# Example using Deferred-stream
===============================
## Server
---------
``` js
var def = require('deferred-stream');

var arr = [1,2,3,4];
var processed = [];

for(var i = 0; i < arr.length; i++){
  processd.push(i,processItem(arr[i]));
}

io.sockets.on('connection', function(sock){
   var b = def(sock);
  
   var something = new Stream();
   b.on('connection', function(stream){
     if(stream.name == "something")
       w.pipe(processed);
   }); 

   //write streams for other processes if needed 
});

function processItem(id,data) {
  var dfd = def(id);
  console.log('called processItem');
 
  //some work.
  setTimeout(function() { dfd.resolve() }, 2000);    
 
  return dfd.promise();
}
```
       
## Client
---------

``` js
var _def  = require(deferred-stream);

var a = _def("something",read);

a.on('readable', function(stream){
    var result = stream.read();
 
    //can listen for any particular stream for status
    a.when(read).then(function(v){
        console.log('streaming completed', v);
    },function(err){
       console.log(err);
    })
});

a.on('end', function(e){
    //handle end
});
``` 
