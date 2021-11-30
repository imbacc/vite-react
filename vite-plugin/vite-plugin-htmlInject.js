import html from 'vite-plugin-html'
const env = process.env
const is_dev = env.NODE_ENV === 'development'
const path = is_dev ? 'src/assets/inject' : 'assets/inject'

// inject
const title = env.VITE_GLOB_APP_TITLE
const injectHeader = `<link defer="defer" href="${path}/inject-test.css" />`
const injectScript = `<script crossorigin defer="defer" type="text/javascript" src="${path}/inject-test.js"></script>`

export default () => {
	return html({
		inject: {
			injectData: {
				title,
				injectHeader,
				injectScript
			}
		},
		minify: true
	})
}
