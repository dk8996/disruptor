(function() {
    var child = require('child_process');
    var processes = {};

    //--- Exported Functions

    exports.start = function(name) {
	console.log(name);
	var process = child.fork(name);
	process.on('message', function(m) {
		console.log('PARENT got message:', m);
	    });
	processes[name] = process;
	
    };

    exports.send = function(name, message) {
	processes[name].send(message);
    }

    exports.processes = function() {
	return(processes);
    }

    exports.stop = function(name) {
	if (processes[name] != null) {
	    console.log('killing '+name);
	    processes[name].kill();

	    delete processes[name];
	}
	else
	    console.log('process not found');
    }

}());
