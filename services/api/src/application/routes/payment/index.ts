import { Route } from '@utils/commons'
import { plansRoutes } from './plans'
import { transactionsRoutes } from './transactions'

export const paymentRoutes: Route[] = [
	...plansRoutes,
	...transactionsRoutes
]