function promiseCancel(f, options) {
	if(!f.then && !f.catch) {
		throw new Error('Argument must be type of fetch.');
	}

	options = options || {};
	var timeout = false;
	var canceled = false;
	var cancelResolve;

	var dummyRequest = new Promise(function(resolve, reject) {
		cancelResolve = resolve;
	});

	var race = Promise.race([dummyRequest, f])
	.then(function(data) {
		if(canceled) {
			var error = new Error('User cancelled promise.');
			error.type = 'cancel';

			return Promise.reject(error);
		}
		else if(timeout) {
			var error = new Error('Promise timeout');
			error.type = 'timeout';

			return Promise.reject(error);
		}
		else {
			return Promise.resolve(data);
		}
	});

	f.cancel = function() {
		canceled = true;
		cancelResolve();
	};
	f.abort = f.cancel;

	if(options.timeout) {
		setTimeout(function() {
			timeout = true;
			cancelResolve();
		}, +options.timeout);
	}

	return race;
}

module.exports = promiseCancel;