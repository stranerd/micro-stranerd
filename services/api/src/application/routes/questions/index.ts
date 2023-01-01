import { Route } from '@utils/app/package'
import { answersRoutes } from './answers'
import { questionsRoutes } from './questions'
import { conversationsRoutes } from './conversations'

export const questionRoutes: Route[] = [
	...answersRoutes,
	...questionsRoutes,
	...conversationsRoutes
]