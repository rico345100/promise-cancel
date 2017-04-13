var promiseCancel = require('./index');

// simulate just plain fetch
// it will just return the response immediately.
var request = fetch('/api');
var request = fetch('/api/long');	// but this API takes 10 seconds to complete request.

promiseCancel(request)
.then((response) => {
	return response.json();
})
.then((data) => {
	console.log('Got: ', data);
})
.catch((err) => {
	console.log('Catch err: ', err);
});

// Let's cancel the fetch if it takes too long.
// var request = fetch('/api/long');

// promiseCancel(request)
// .then((response) => {
// 	return response.json();
// })
// .then((data) => {
// 	console.log('Got: ', data);
// })
// .catch((err) => {
// 	console.log('Catch err: ', err);
// });

// setTimeout(() => {
// 	console.log('It takes too long. Just cancel it.');
// 	request.cancel();
// }, 5000);

// Or, using timeout option to call cancel automatically.
// var request = fetch('/api/long');

// promiseCancel(request, { timeout: 3000 })
// .then((response) => {
// 	return response.json();
// })
// .then((data) => {
// 	console.log('Got: ', data);
// })
// .catch((err) => {
// 	console.log('Catch err: ', err);
// });