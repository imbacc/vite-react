import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// plugin
import { viteMockServe } from 'vite-plugin-mock' // mock

import gzipPlugin from 'rollup-plugin-gzip' //Gzip
import IconsPlugin from 'unplugin-icons/vite' // icon 按需引入
import windicssPlugin from 'vite-plugin-windicss' // windicss
import compressionPlugin from 'vite-plugin-compression' // 使用gzip或brotli来压缩资源

import envPlugin from './vite-plugin/vite-plugin-env.js' // env 环境
import routerPagePlugin from './vite-plugin/vite-plugin-routerPage.js' // 自动导入路由 需要可以用
import htmlInjectPlugin from './vite-plugin/vite-plugin-htmlInject.js' //html inject

/**
 * @type {import('vite').UserConfig}
 */

const config = {
	server: {
		// minify: 'esbuild',
		// open: '/',
		hmr: { overlay: false },
	},

	//编译
	build: {
		target: 'modules',
		cssCodeSplit: true,
		outDir: 'dist',
		assetsDir: 'assets',
		// 生成生产map
		sourcemap: false,
		// 关闭brotliSize显示可以稍微缩短打包时间
		brotliSize: false,
		// chunk 大小警告的限制
		chunkSizeWarningLimit: 500,
		// 小于此数字（以字节为单位）的静态资产文件将内联为 base64字符串。默认限制为“4096”（4kb）。设置为“0”以禁用。
		assetsInlineLimit: 4096,
		// 是否对CSS进行代码拆分。启用时，异步块中的CSS将在块中作为字符串内联，并通过动态创建的加载块时的样式标记。
		// 打包引入 输出
		rollupOptions: {
			format: 'commonjs',
			// external: ['vue'],
			output: {
				// chunks 做操作 注释将减少分割
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString()
					}
				},
				// globals: {
				// 	vue: 'Vue'
				// }
			},
		},
	},

	//部门优化选项
	optimizeDeps: {
		entries: ['react'],
		// include: [],
		// exclude: ['screenfull', 'nprogress']
	},

	resolve: {
		alias: {
			// v2.0不再需要/开始/结束斜杠。 /@/ -> @
			// '/@': root, vite 内部在用，这里不能用了
			// '/root': __dirname, vite 内部在用，这里不能用了
			'@': resolve(__dirname, 'src'),
			'@assets': resolve(__dirname, 'src/assets'),
			'@components': resolve(__dirname, 'src/components'),
			'@views': resolve(__dirname, 'src/views'),
			'@common': resolve(__dirname, 'src/common'),
			'@styles': resolve(__dirname, 'src/styles'),
		},
	},

	// 插件
	plugins: [react(), envPlugin(), IconsPlugin(), routerPagePlugin(), windicssPlugin(), htmlInjectPlugin()],

	// 要将一些共享的全局变量传递给所有的Less样式
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "@styles/global.scss" as *;`,
			},
		},
	},
}

export default ({ command, mode }) => {
	const { VITE_USE_MOCK, VITE_BUILD_GZIP, VITE_REMOTE_ASSETS } = process.env
	console.log('command=', command)
	console.log('mode=', mode)

	if (command === 'build' && mode === 'production') {
		// 编译环境配置
		// Gzip
		if (VITE_BUILD_GZIP) config.plugins.push(gzipPlugin())
		config.plugins.push(compressionPlugin())
	} else {
		// 开发环境配置
		// vite-plugin-mock
		if (VITE_USE_MOCK) config.plugins.push(viteMockServe({ mockPath: 'mock', supportTs: false }))
	}
	return config
}
