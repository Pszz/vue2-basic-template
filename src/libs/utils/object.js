export default {
	// 对象拷贝
    deepCopy (p, d) {
    	let c 
    	if (p instanceof Array) {
    		c = d || []
    	} else {
    		c = d || {}
    	}
　　　　	for (let i in p) {
　　　　　　	if (typeof p[i] === 'object' && p[i] !== null) {
　　　　　　　　		c[i] = (p[i].constructor === Array) ? [] : {}
　　　　　　　　		this.deepCopy(p[i], c[i])
　　　　　　	} else {
　　　　　　　　　	c[i] = p[i]
　　　　　　	}
　　　　	}
　　　　	return c
　　 	},
	/**
	 *  es6 Map
	 *  json对象转Map对象
	 */
	jsonToMap (obj) {
		let newMap = new Map()
		for (let k of Object.keys(obj)) {
			newMap.set(obj[k][0], obj[k][1])
		}
		return newMap
	}
}
