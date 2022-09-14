import { Route } from '@utils/app/package'
import { plansRoutes } from './plans'
import { transactionsRoutes } from './transactions'
import { cardsRoutes } from './cards'
import { walletsRoutes } from './wallets'

export const paymentRoutes: Route[] = [
	...plansRoutes,
	...transactionsRoutes,
	...cardsRoutes,
	...walletsRoutes
]