import { Route } from '@utils/app/package'
import { coursesRoutes } from './courses'
import { filesRoutes } from './files'

export const teachersRoutes: Route[] = [
	...coursesRoutes,
	...filesRoutes
]