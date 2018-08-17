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
	t.true(result.length > 0);
});

test('test fd.get() with html text', async t => {
	const result = await f.get('/statuses/user_timeline', {id: 10962, format: 'html'});
	t.true(result.length > 0);
});

test('test post status', async t => {
	const result = await f.post('/statuses/update', {status: 'hi', source: 'unicorn'});
	t.true(result.length > 0);
});
