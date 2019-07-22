export default {
	/**
	 * @func
	 * @desc 用于将后台返回的字段类型转化为 string, int, double, date
	 * @param {String} coType - 必选，后台返回的字段类型
	 * @returns {String} 返回转化后的字段类型
	 */
	changeCoType (coType) {
		let returnStr = ''
		if (coType !== null && coType !== '') {
			let tCoType = coType.toUpperCase()
			if (tCoType === 'VARCHAR' || tCoType === 'VARCHAR2' || tCoType === 'CHAR' || 
				tCoType.indexOf('VARCHAR') > -1 || tCoType.indexOf('LOB') > -1) {
                returnStr = 'string'
            }
            if (tCoType === 'LONG' || tCoType === 'NUMBER' || tCoType === 'DECIMAL' || tCoType === 'INTEGER') {
                returnStr = 'int'
            }
            if ((tCoType.indexOf('NUMBER') > -1 && tCoType === 'NUMBER') || 
            	(tCoType.indexOf('DECIMAL') > -1 && tCoType === 'DECIMAL') || 
            	tCoType === 'FLOAT') {
                returnStr = 'double'
            }
            if (tCoType.indexOf('DATE') > -1 || tCoType.indexOf('TIME') > -1) {
                returnStr = 'date'
            }
            if (coType === null || coType === '') {
            	return coType
            }
		}
		return returnStr
	}
}
