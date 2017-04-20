const promiseCancel = (promise, options) => {
	options = options || {};
	let timeout = options.timeout;
	let canceled = false;

	let cancelResolve;
	let dummyRequest = new Promise(function(resolve, reject) {
		cancelResolve = resolve;
	});

	let race = Promise.race([dummyRequest, promise])
	.then(function(data) {
		if(canceled) {
			let error = new Error('User cancelled promise.');
			error.type = 'cancel';

			return Promise.reject(error);
		}
		else if(timeout) {
			let error = new Error('Promise timeout');
			error.type = 'timeout';

			return Promise.reject(error);
		}
		else {
			return Promise.resolve(data);
		}
	});

	if(options.timeout) {
		setTimeout(function() {
			timeout = true;
			cancelResolve();
		}, +options.timeout);
	}

	function cancel() {
		canceled = true;
		cancelResolve();
	}

	return {
		promise: race,
		cancel: cancel,
		abort: cancel
	};
};

module.exports = promiseCancel;