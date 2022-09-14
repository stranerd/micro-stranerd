import { Route } from '@utils/app/package'
import { answersRoutes } from './answers'
import { questionsRoutes } from './questions'

export const questionRoutes: Route[] = [
	...answersRoutes,
	...questionsRoutes
]