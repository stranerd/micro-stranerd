import { Route } from '@utils/app/package'
import { plansRoutes } from './plans'
import { transactionsRoutes } from './transactions'
import { methodsRoutes } from './methods'
import { walletsRoutes } from './wallets'

export const paymentRoutes: Route[] = [
	...plansRoutes,
	...transactionsRoutes,
	...methodsRoutes,
	...walletsRoutes
]