import { coursesRoutes } from './courses'
import { departmentsRoutes } from './departments'
import { facultiesRoutes } from './faculties'
import { institutionsRoutes } from './institutions'
import { pastQuestionsRoutes } from './pastQuestions'
import { Route } from '@utils/app/package'

export const schoolRoutes: Route[] = [
	...coursesRoutes,
	...departmentsRoutes,
	...facultiesRoutes,
	...institutionsRoutes,
	...pastQuestionsRoutes
]