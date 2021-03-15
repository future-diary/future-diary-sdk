# future-diary-sdk

[![](https://img.shields.io/npm/v/future-diary-sdk.svg)](https://www.npmjs.com/package/future-diary-sdk)
[![](https://img.shields.io/npm/l/future-diary-sdk.svg)](https://github.com/future-diary/future-diary-sdk/blob/master/LICENSE)
[![](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

Future Diary SDK for Node.js

## Install

```bash
$ npm i future-diary-sdk
```

## Usage

```javascript
const Future = require('future-diary-sdk');

const f = new Future({
	host: 'weilairiji.com',
	username: '',
	password: ''
});

(async () => {
	try {
		// GET
		const timeline = await f.get('/statuses/user_timeline', {id: 10962});
		console.log(timeline);

		// POST
		const result = await f.post('/statuses/update', {status: 'unicorn'});
		console.log(result);
	} catch (err) {
		console.log(err);
	}
})();
```

> For more APIs, see the [Future Diary API doc](http://weilairiji.com/api.html).

## API

```javascript
f.get(uri, params);
f.post(uri, params);
```

## Related

- [future-diary-cli](https://github.com/future-diary/future-diary-cli) - CLI for this module
- [fanfou-sdk](https://github.com/LitoMore/fanfou-sdk-node) - Fanfou SDK for Node.js

## License

MIT © [Future Diary](https://github.com/future-diary)
