/**
    文件：src/utils/backend.js
    描述：请求后端的工具
*/
import api from '../conf/api'
import axios from 'axios'

let config = window.config

let mAxiosHandler = null

/**
 * 读取api配置
 * @param {*} value 
 */
function getApiConf (value) {
    if (!value) {
	    throw new Error('Api path is null')	
	}
    if (typeof (value) === 'string') {
        return { 
            path: value,
            method: 'GET'
        }
    } else {
        if (!value) {
            throw new Error('Api未配置' + JSON.stringify(value))
        }
        if (typeof (value) !== 'object') {
            throw new Error('Api配置错误' + JSON.stringify(value))
        }
        if (!value.method) {
            throw new Error('Api配置错误，缺少method属性' + JSON.stringify(value))
        }
        if (!value.path) {
            throw new Error('Api配置错误，缺少path属性' + JSON.stringify(value))
        }
        return { 
            path: value.path,
            method: value.method.toLowerCase(),
            server: value.server
        }
    }
}

/**
 * 根据api.path获取完整的url
 * @param {*} api 
 */
function getUrl (api) {
	if (process.env.NODE_ENV === 'development') {
		return api.path
	} else {
		let server = api.server || 'default'
		return config.servers[server] + api.path
	}
}

/**
 * 构建url参数
 * @param {*} json 
 */
function buildQuery (json) {
	if (!json) {
		return ''
	}
	let query = '?'
	let paramConcat = '&'

	for (let i in json) {
		query += (i + '=' + encodeURIComponent(json[i]) + paramConcat)
	}
	if (query.charAt(query.length - 1) === paramConcat) {
		query = query.substr(0, query.length - 1)
	}
	return query
}

/**
 * 发送http请求
 * @param {*} settings 
 */
function request (settings) {
	let api = settings.api
	let data = settings.data
	let options = settings.options || {}
	let query = settings.query
	let restful = settings.restful || true
	
    api = getApiConf(api)
	let url = getUrl(api)

    let isDataAsQuery = (api.method === 'get' || api.method === 'delete') && !query && data
    if (isDataAsQuery) {
        query = data
    }
    let params = null
    if (restful) {
        params = query
    } else {
        url += buildQuery(query)
    }
    let axios = createAxiosInstance({
        url,
        params,
        data,
        responseType: settings.responseType
    })
    if (typeof mAxiosHandler === 'function') {
        mAxiosHandler(axios)
    }
    return new Promise((resolve, reject) => {
        axios.request({ method: api.method }).then(response => {
            // 此处一定要判断，因为拦截器可能什么也没有返回
            if (response) {
                resolve(response.data)
            }
        }).catch(error => {
            reject(error)
        })  
    })
}

/**
 * 创建axios实例
 * @param {*} param0 
 */
function createAxiosInstance ({ url, responseType, params, data }) {
    return axios.create({
         url: url,
         timeout: 45000,
         headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        },
        responseType: responseType | 'json',
        params: params,
        data: data
    })
}

/**
 * 请求代理类
 */
export default {
	/**
	 * 获取url
	 */
	getUrl (apiKey, data) {
		let api = getApiConf(apiKey)
		let url = getUrl(api)
		if (typeof data === 'object') {
			url += buildQuery(data)
		}
		return url
	},
	/**
	 * 请求后端
	 * @param apiKey 获取URL用，即定义在src/conf/api.js中的api的Key
	 * @param data JSON数据
	 * @param options ajax附件参数，主要是http header，用的比较少
	 */
	request (api, data, options) {
        return request({
            api,
            data,
            options
        })
	},
	/**
	 * @param {
	 * 	api: '' // piKey 获取URL用，即定义在src/conf/api.js中的api的Key
	 *  data: JSNO对象，POST或者PUT到服务端的JOSON数据，如果是GET或者Delete则实际转换成url参数
	 *  query: FormData
	 * }
	 */
	send (settings) {
		return request(settings)
	},
    setAxiosHandler (handler) {
        mAxiosHandler = handler
    },
    /**
     * 转换错误
     * @param {*} error 
     */
    convertError (error) {
        let ret = { code: -1 }
        let response = error.response
        if (response) {
            ret.code = response.status
            let url = response.config.url
            if (response.status === 504) {
                ret.msg = '服务器网关超时，请联系管理员，请求：' + url
            } else if (response.status === 404) {
                ret.msg = '服务未启动或未找到接口，请求：' + url
            } else {
                ret.msg = '服务器繁忙，请稍后再试，请求：' + url
            }
        } else {
            ret.msg = '无法连接服务器，请检查您的网络'
        }
        return ret
    }
}