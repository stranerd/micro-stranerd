import { Route } from '@utils/app/package'
import { coursesRoutes } from './courses'
import { filesRoutes } from './files'
import { attendancesRoutes } from './attendances'
import { assignmentsRoutes } from './assignments'
import { assignmentSubmissionsRoutes } from './assignmentSubmissions'
import { postsRoutes } from './posts'

export const teachersRoutes: Route[] = [
	...coursesRoutes,
	...filesRoutes,
	...attendancesRoutes,
	...assignmentsRoutes,
	...assignmentSubmissionsRoutes,
	...postsRoutes
]