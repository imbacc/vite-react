/**
 * 拦截请求
 */
import axios from 'axios'
import store from '@/common/store/index.js'
import message from '@/common/tools/cmake_message.js'

import { env, time_out, page_key, size_key, is_dev } from '@common/config/cfg.js'
import { setRequestInit, requestAction } from 'imba-request'

const { VITE_GLOB_API_URL } = env
const http = axios.create({
	baseURL: VITE_GLOB_API_URL, // url = base url + request url
	timeout: time_out
})

// 初始化封装请求包
setRequestInit({
	page: page_key,
	size: size_key,
	dev: is_dev,
	http: http
})

const error_msg = async (msg = '网络异常') => {
	console.error(msg)
	message.send(msg, 'error').hide()
}

const go_logion = () => {
	localStorage.removeItem('token')
	window.location = '/login'
}

const repeat_function = (cache_name) => {
	// 处理重复请求
	const repeat_mark = repeat_record[cache_name]
	if (!repeat_mark) {
		repeat_record[cache_name] = true
		return false
	}
	console.error(`${cache_name} 请求重复!`)
	return true
}

const repeat_record = {}
const repeat_delete = (cache_name) => delete repeat_record[cache_name]

// 请求拦截器
http.interceptors.request.use(
	(config) => {
		// 在发送请求之前做些什么
		let _data = {}

		try {
			_data = JSON.parse(config.data)
		} catch (error) {
			_data = {}
		}

		const { _noToken, _formData, _header } = _data
		const url = config.url

		const _repeat = repeat_function(url)
		if (_repeat) return Promise.reject(`_repeat_${url}`)

		let token = store.state.user_vuex.token
		if (token) config.headers['Authorization'] = `bearer ${token}`

		if (_noToken) {
			delete config.data['_noToken']
			delete config.header['x-access-token']
			delete config.header['Authorization']
		}

		if (_formData) {
			config.header['content-Type'] = 'application/x-www-form-urlencoded'
			delete config.data['_formData']
		}

		if (_header) {
			config.headers = { ...config.headers, ..._header }
			delete config.data['_header']
		}

		// console.log("【config】 " + JSON.stringify(config))
		return config
	},
	(error) => {
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 响应拦截器
http.interceptors.response.use(
	(response) => {
		const { status, data, config } = response

		repeat_delete(config.url)

		if (status === 401) {
			go_logion()
			return
		}

		if (status === 200) {
			if (data.code === 0) return data.data
		}

		if (data && data?.code < 0) {
			error_msg(data.msg)
			return Boolean(false)
		}

		return Boolean(false)
	},
	(error) => {
		// 对响应错误做点什么
		const err = error.toString()
		const { code, msg, message } = error.response?.data || {}

		if (error.response?.config) repeat_delete(error.response.config.url)

		// 重复请求
		if (err.indexOf('_repeat_') !== -1) {
			let key = err.split('_repeat_')
			key = key[key.length - 1].trim()
			repeat_delete(key)
			return Boolean(false)
		}

		if (code && code < 0) {
			if (code === -99999) {
				localStorage.removeItem('token')
				location = '/login'
			}
			error_msg(msg)
			return Boolean(false)
		}

		if (err.indexOf('code 400') !== -1) {
			error_msg(message || '400 error')
			return Boolean(false)
		}

		if (err.indexOf('code 500') !== -1) {
			error_msg(message || '500 error')
			return Boolean(false)
		}

		if (err.indexOf('code 503') !== -1) {
			error_msg(message || '503 error')
			return Boolean(false)
		}

		if (err.indexOf('code 401') !== -1) {
			error_msg(message || '401 error')
			go_logion()
			return Boolean(false)
		}

		if (err.indexOf('code 403') !== -1) {
			// 服务器错误信息回应
			error_msg(message || '403 error')
			return Boolean(false)
		}

		if (err.indexOf('Error') !== -1) {
			error_msg(message || '网络异常')
			return Boolean(false)
		}

		return Promise.reject(error)
	}
)

export default requestAction
