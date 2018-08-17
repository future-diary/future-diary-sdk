const got = require('got');
const iconv = require('iconv-lite');

class FutureDiary {
	constructor(opt) {
		this.host = 'weilairiji.com';
		this.username = opt.username || '';
		this.password = opt.password || '';
		this.endpoint = `http://${this.host}`;
	}

	async get(uri, params) {
		const url = this.endpoint + '/api' + uri + '.json';
		const {body} = await got.get(url, {
			encoding: null,
			auth: `${this.username}:${this.password}`,
			query: params
		});
		const result = iconv.decode(body, 'gb2312');
		return FutureDiary.fixJson(result);
	}

	static fixJson(str) {
		const result = str
			.replace(/"reply_to_status_id"="/g, `"reply_to_status_id":"`)
			.replace(/"reply_to_user_id"="/g, `"reply_to_user_id":"`);
		return result;
	}
}

module.exports = FutureDiary;
