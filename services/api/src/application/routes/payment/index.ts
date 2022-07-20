import { Route } from '@utils/commons'
import { plansRoutes } from './plans'
import { transactionsRoutes } from './transactions'
import { cardsRoutes } from './cards'

export const paymentRoutes: Route[] = [
	...plansRoutes,
	...transactionsRoutes,
	...cardsRoutes
]