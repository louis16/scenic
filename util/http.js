import {
	storageSync,
	getStorageSync,
	TOKEN
} from "./util";
import {
	refreshToken
} from "./api"

//导入模块使用相对路径，不能使用绝对路径
const base_url = 'https://api.ysr.uninote.com.cn'
//定义错误码信息
const tips = {
	1: "亲:小E迷路了,请等等我"
};



function request(params) {
	const HEADER_TOKEN = `Bearer ${getStorageSync(TOKEN)}`
	return new Promise((resolve, reject) => {
		wx.request({
			url: base_url + params.url,
			method: params.method || 'GET',
			data: params.data,
			header: {
				"Authorization": HEADER_TOKEN,
				"content-type": "application/json"
			},
			success: (res) => {
				//网络状态码
				let statusCode = res.statusCode.toString();
				if (statusCode.startsWith('2')) {
					// 请求码
					let code = res.data.code;
					if (code === 1) { //请求成功
						resolve(res.data.data)
					} else { //请求失败
						_showToas(res.data.msg.toString());
					}
				} else if (statusCode === '403') {
					reject(403)
					refreshToken().then(res => {
						storageSync(TOKEN, res.access_token)
					})
				} else {
					wx.showToast({
						title: "网络请求错误(" + statusCode + ")",
						icon: "none",
						duration: 1500,
						mask: false
					});
				}
			},
			fail: (res) => {
				wx.showToast({
					title: "网络异常,请检查网络连接!",
					icon: 'none',
					duration: 1500,
					mask: false
				});
			}
		});
	})
}

//显示错误提示的方法,以_开始的方法为私有方法
function _showErrInfo(errCode) {
	if (!errCode) {
		errCode = 1;
	}
	wx.showToast({
		title: tips[errCode],
		icon: "none",
		duration: 2000,
		mask: false
	});
}

function _showToas(msg) {
	wx.showToast({
		title: msg,
		icon: "none",
		duration: 2000,
		mask: false
	});
}
export {
	request,
	_showToas
};