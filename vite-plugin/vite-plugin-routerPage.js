import routerPages from 'vite-plugin-pages'

export default () => {
	return routerPages({
		extendRoute(route, parent) {
			if (route.path === '/') return route
			const split = route.path.split('/').filter((f) => f)
			const name = split[split.length - 1]
			route.name = name
			route.path = `/${name}`
			return route
			// return {
			// 	...route,
			// 	meta: { auth: ['user'] }
			// }
		},
		pagesDir: 'src/views'
	})
}
