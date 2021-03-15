const got = require('got');
const iconv = require('iconv-lite');
const urlencode = require('urlencode');

class FutureDiary {
	constructor(opt) {
		this.host = opt.host || 'weilairiji.com';
		this.username = opt.username || '';
		this.password = opt.password || '';
		this.endpoint = `http://${this.host}`;
	}

	async get(uri, parameters) {
		const url = this.endpoint + '/api' + uri + '.json';
		const {body} = await got.get(url, {
			encoding: null,
			auth: `${this.username}:${this.password}`,
			query: parameters
		});
		const result = iconv.decode(body, 'gb2312');
		return FutureDiary._parseJson(result);
	}

	async post(uri, parameters) {
		const url = this.endpoint + '/api' + uri + '.json';
		const {body} = await got.post(url, {
			encoding: null,
			auth: `${this.username}:${this.password}`,
			headers: {'content-type': 'application/x-www-form-urlencoded; charset=gb2312'},
			from: true,
			body: urlencode.stringify(parameters, {charset: 'gb2312'})
		});
		const result = iconv.decode(body, 'gb2312');
		return FutureDiary._parseJson(result);
	}

	static _parseJson(string) {
		const result = string
			.replace(/"reply_to_status_id"="/g, '"reply_to_status_id":"')
			.replace(/"reply_to_user_id"="/g, '"reply_to_user_id":"');
		try {
			return JSON.parse(result);
		} catch {
			return result;
		}
	}
}

module.exports = FutureDiary;
