var Stream = require('stream').Stream,
    EventEmitter = require('events').EventEmitter,
    $ = require('jquery');

module.exports = Stream;

function Stream(sock){
    var streams = {},
        event = new EventEmitter(),
        count = 1;

    function _createStream(options){
	var s = new Stream(),
       	    closed = $.deferred();
	
	s.readable = options.read || false;
	s.writable = options.write || false;

	if(options.opts || options.options)
	    s.options = options.opts || options.options;
	
	if(streams[options.name])
	    throw new Error('stream with name"'+options.name+'" already exists');
	s.name = options.name;
	streams[options.name] = true;

	s._id = options.id || count++;

	s.destroy = function(){
	    ended = true;
	    cleanup();
	    s.emit('close');
	}

	function onPause(){
	    s.paused = true;
	}

	function onResume(){
	    s.paused = false;
	    s.emit('drain');
	}

	function cleanup(){
	    
	}

	function onData(){
	    s.emit('data', data);
	}
	
	function onEnd(){
	    if(!ended){
		s.emit('end');
		cleanup();
	    }
	}

	if(s.writable){
	    var id = s._id;
	    
	    s.write = function(data){
		if(ended){
		    throw new Error('write to stream ended');
		}
		sock.emit();
		return !s.paused;
	    }
	    
	    s.end = function(data){
		if(data != null){
		    this.write(data);
		}
		if(!ended){
		    sock.emit();
		}
		s.destroy();
	    }
	}

	if(s.readable){
	    var id = s._id,
    	        s.readable = true;

	    sock.on('',onData);
	    sock.on('',onEnd);
	    
	    s.pause = function(){
		s.paused = true;
		if(ended){
		    return;
		}
		sock.emit();
	    }

	    s.resume = function(){
		s.paused = false;
		if(ended){
		    return;
		}
		sock.emit();
	    }
	}

	return s;
    }

    event.writeStream = function(name, opts){
	return this.createStream(name, opts, {write: true});
    }

    event.readStream = function(name, opts){
	return this.createStream(name, opts, {read: true});
    }

    event.createStream = function(name, opts, settings){
	settings = settings || {};
        settings.name = name;
        settings.options = opts;

        var s = _createStream(settings);
    }

    return event;
}
