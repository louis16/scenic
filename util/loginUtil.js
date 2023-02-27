export const getWxCode = () => {
	return new Promise((resolve, reject) => {
		// session_key 已经失效，需要重新执行登录流程
		wx.login({
			success(res) {
				const code = res.code
				if (code) {
					resolve(code)
				} else {
					wx.showModal({
						title: '提示',
						content: '微信登录不成功，请稍后再试！',
						showCancel: false,
						confirmText: '确认'
					})
					resolve(null)
				}
			}
		})
	})
}

export const getWxUserInfo = () => {
	return new Promise((resolve, reject) => {
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userInfo']) {
					const userInfo = {}
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称
					wx.getUserProfile({
						desc: '获取头像与昵称用以展示个人信息',
						success: function (userRes) {
							userInfo.encryptedData = userRes.encryptedData
							userInfo.iv = userRes.iv
							userInfo.userInfo = userRes.userInfo
							resolve(userInfo)
						},
						fail: (res) => {
							resolve(res)
						}
					})

				}
			},
		})
	})
}