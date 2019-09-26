const got = require('got');
const iconv = require('iconv-lite');
const urlencode = require('urlencode');

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
		return FutureDiary._parseJson(result);
	}

	async post(uri, params) {
		const url = this.endpoint + '/api' + uri + '.json';
		const {body} = await got.post(url, {
			encoding: null,
			auth: `${this.username}:${this.password}`,
			headers: {'content-type': 'application/x-www-form-urlencoded; charset=gb2312'},
			from: true,
			body: urlencode.stringify(params, {charset: 'gb2312'})
		});
		const result = iconv.decode(body, 'gb2312');
		return FutureDiary._parseJson(result);
	}

	static _parseJson(str) {
		const result = str
			.replace(/"reply_to_status_id"="/g, '"reply_to_status_id":"')
			.replace(/"reply_to_user_id"="/g, '"reply_to_user_id":"');
		try {
			return JSON.parse(result);
		} catch (_) {
			return result;
		}
	}
}

module.exports = FutureDiary;
