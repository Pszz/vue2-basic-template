export default {
	/**
	 * @func
	 * @desc 阿拉伯数字单位转换，并保留 n 位小数：1 0000 -> 1 万，1 0000 0000 -> 亿，以此类推。
	 * @param {Number} num - 需要转换的数字
	 * @param {Number} digit - 需保留的小数位数，默认保留两位小数
	 * @returns {String} 转换后的数字
	 */
	unitConvert (num, digit) {
		let unit = ''
		let newNum = ''
		// 默认保留两位小数
		if (digit === null || typeof digit === 'undefined') {
			digit = 2
		}
		// 判断 num 是否为空
		if (num === null || typeof num === 'undefined') {
			return
		}
		// 判断 num 是否为数字
		if (!isNaN(num)) {
			if (num < 10000) { // 小于 1 0000，原样输出
				newNum = num
			} else if (num >= 10000 && num < 100000000) { // 大于 1 0000 小于 1 0000 0000
				unit = '万'
				newNum = (num / 10000).toFixed(digit) + unit
			} else if (num >= 100000000) { // 大于 1 0000 0000
				unit = '亿'
				newNum = (num / 100000000).toFixed(digit) + unit
			}
			return newNum
		} else {
			return num
		}
	}
}
