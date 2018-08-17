const test = require('ava');
const Future = require('.');

const {
	FD_USERNAME: username,
	FD_PASSWORD: password
} = process.env;

const f = new Future({username, password});

test('test fd.get() without query', async t => {
	const result = await f.get('/statuses/user_timeline');
	t.is(result, '不存在该用户');
});

test('test fd.get() with plain text', async t => {
	const result = await f.get('/statuses/user_timeline', {id: 10962});
	t.is(result.length > 0, true);
});

test('test fd.get() with html text', async t => {
	const result = await f.get('/statuses/user_timeline', {id: 10962, format: 'html'});
	t.is(result.length > 0, true);
});
