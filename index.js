const got = require('got');
const iconv = require('iconv-lite');
const FormData = require('form-data');

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
		const form = new FormData();
		Object.keys(params).forEach(key => {
			form.append(key, params[key]);
		});
		const {body} = await got.post(url, {
			encoding: null,
			auth: `${this.username}:${this.password}`,
			headers: {'content-type': 'multipart/form-data; charset=gb2312; boundary=' + form.getBoundary()},
			body: form
		});
		const result = iconv.decode(body, 'gb2312');
		return FutureDiary._parseJson(result);
	}

	static _parseJson(str) {
		const result = str
			.replace(/"reply_to_status_id"="/g, `"reply_to_status_id":"`)
			.replace(/"reply_to_user_id"="/g, `"reply_to_user_id":"`);
		try {
			return JSON.parse(result);
		} catch (err) {
			return result;
		}
	}
}

module.exports = FutureDiary;
