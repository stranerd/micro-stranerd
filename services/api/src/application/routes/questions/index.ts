import { Route } from '@utils/commons'
import { answersRoutes } from './answers'
import { questionsRoutes } from './questions'

export const questionRoutes: Route[] = [
	...answersRoutes,
	...questionsRoutes
]