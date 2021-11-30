// Dotenv 是一个零依赖的模块，它能将环境变量中的变量从 .env 文件加载到 process.env 中

const env = process.env
const fs = require('fs')
const dotenv = require('dotenv')
const envDefault = dotenv.parse(fs.readFileSync(`.env`))
const envConfig = dotenv.parse(fs.readFileSync(`.env.${env.NODE_ENV}`))
const envMerge = Object.assign(envDefault, envConfig)
for (const k in envMerge) {
	env[k] = envMerge[k]
}

const createProxy = (list = []) => {
	if (typeof list === 'string') list = JSON.parse(list)
	const ret = {}
	for (const [prefix, target] of list) {
		ret[prefix] = {
			target: target,
			changeOrigin: true,
			rewrite: (path) => path.replace(new RegExp(`^${prefix}`), '')
		}
	}
	return ret
}

export default function myPlugin() {
	const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = env

	return {
		name: 'env-config',

		config: () => ({
			base: VITE_PUBLIC_PATH,
			server: {
				port: VITE_PORT,
				proxy: createProxy(VITE_PROXY || [])
			},
			build: {
				polyfillDynamicImport: VITE_LEGACY || false,
				terserOptions: {
					compress: {
						keep_infinity: true,
						drop_console: VITE_DROP_CONSOLE || false
					}
				}
			}
		})
	}
}
