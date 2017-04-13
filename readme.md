# promise-cancel
Add ability to cancel/timeout to your Promise! Note that this is not Promise implementation or polyfill!
Make sure your JavaScript environment support Promise API first. If not, you can use plenty of polyfills such as [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) or [Fetch polyfill](https://github.github.io/fetch/).

## Usage
Install via npm:

```bash
$ npm install --save promise-cancel
```

And require it.

```javascript
var promiseCancel = require('promise-cancel');
```

And wrap your promise object.

```javascript
var request = new Promise(...);

promiseCancel(request)
.then(...)
.catch(...)
```

When you cancel the promise, catch will got it.

## Examples
This module is designed for adding canceling Fetch request. But it's not using Fetch API features inside, so you don't need to worry about that.

### Cancel Example
```javascript
var request = fetch('/api/long');

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

setTimeout(() => {
	console.log('It takes too long. Just cancel it.');
	request.cancel();
}, 5000);
```

### Timeout Example
```javascript
var request = fetch('/api/long');

promiseCancel(request, { timeout: 3000 })
.then((response) => {
	return response.json();
})
.then((data) => {
	console.log('Got: ', data);
})
.catch((err) => {
	console.log('Catch err: ', err);
});
```

## How to distinguish between Timeout or User cancellation?
promise-cancel call the onRejected callback when it canceled or timed-out, but parameter of onReject callback is just Error object.

Compare the message to distinguish is terrible idea, so I added a addtional property inside of Error, 'type'.
Type can be 'undefined', 'cancel', 'timeout'. Of course, undefined means that there is no type, it's just coming from something else not user cancel or timed out.

```javascript
.catch((err) => {
	if(err.type === 'timeout') { ... }
	else if(err.type === 'cancel') { ... }
	else {
		...
	}
})
```


## API
### promiseCancel(Promise p, Object options)
Create new cancelable promise. Possible options are:

- Number options.timeout: Set timeout.

### promiseCancel.cancel
### promiseCancel.abort
Cancle current working promise. Note that if you are using this module for adding cancel for Fetch, request itself can't be aborted. This is the limitation of current Fetch implementation, unlike XHR has abort method.

Anyway only you can do is stop promise flow going, and give immediately some fetch related tasks.


## License
MIT. Free to use.