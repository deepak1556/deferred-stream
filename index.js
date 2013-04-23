var Stream = require('./lib/stream.js'),
    DeferredState = {
	UNRESOLVED : 0,
        RESOLVED : 1,
        REJECTED : 2
    };

module.exports = Deferred;

function Deferred(){

}