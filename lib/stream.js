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
	
	if(s.writable){

	}

	if(s.readable){

	}
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
