var promiseCancel = require('./index');

// simulate just plain fetch
// it will just return the response immediately.

function doAsync() {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, 5000);
	});
}

// Basic promise usage
// doAsync()
// .then(() => console.log('Done!'))
// .catch((err) => console.log('Error'));

// Cancelable example
// var request = doAsync();
// var cancelable = promiseCancel(request);

// cancelable.promise
// .then(() => console.log('Done!'))
// .catch((err) => console.log('Error', err));

// setTimeout(cancelable.cancel, 3000);

// Timeout example
var request = doAsync();
var cancelable = promiseCancel(request, { timeout: 3000 });

cancelable.promise
.then(() => console.log('Done!'))
.catch((err) => console.log('Error'));