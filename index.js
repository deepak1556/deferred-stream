var Stream = require('./lib/stream.js'),
    DeferredState = {
	UNRESOLVED : 0,
        RESOLVED : 1,
        REJECTED : 2
    },
    StreamType = {
	read : Stream.readStream,
	write : Stream.writeStream,
	both : Stream.createStream
    };

module.exports = Deferred;

function Deferred(stream, name, opts){
    var state = DeferredState.UNRESOLVED,
        dfevt = new EventEmitter(),
        reason,value;

    if(StreamType[stream] !== undefined){
	var opts = opts || {};
	
	StreamType[stream](name, opts);
    }

    var processStream = function (ResolvedCallback, RejectedCallback){

    }

    processStream.prototype = {
	cleanup : function(err){
	    state = DeferredState.REJECTED;

	    reason = err;

	    if(RejectedCallback){
		RejectedCallback():
	    }
	},
	completed : function(){
	    state = DeferredState.RESOLVED;

	    if(ResolvedCallback){
		ResolvedCallback();
	    }
	}
    }

    dfevt.resolve = function(cb, opts){
	if(!cb){
	    return;
	}

	var ps = new processStream();

	try{
	    var result = cb(opts);
	}catch(err){
	    ps.cleanup(err);
	}
    }

    dfevt.then = function(ResolvedCallback, RejectedCallback){
	if(state !== DeferredState.UNRESOLVED){
	    return handleSync(ResolvedCallback, RejectedCallback);
	}

	processStream(handleResolved, handleRejected);

	function handleResolved(){
	    resolve(ResolvedCallback);
	}

	function handleRejected(err){
	    resolve(err,RejectedCallback);
	}

	return $.promise();
    }

    return dfevt;
}

function handleSync(ResolvedCallback, RejectedCallback){
    if(state === DeferredState.RESOLVED && ResolvedCallback){
	process.nextTick(function(){
	    ResolvedCallback();
	});
    }else if(state === DeferredState.REJECTED && RejectedCallback){
	process.nextTick(function(){
	    RejectedCallback();
	})
    }
}