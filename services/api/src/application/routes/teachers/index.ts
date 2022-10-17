import { Route } from '@utils/app/package'
import { coursesRoutes } from './courses'
import { filesRoutes } from './files'
import { attendancesRoutes } from './attendances'

export const teachersRoutes: Route[] = [
	...coursesRoutes,
	...filesRoutes,
	...attendancesRoutes
]