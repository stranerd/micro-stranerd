import { makeController, Route, StatusCodes } from '@utils/commons'
import { appId } from '@utils/environment'
import { authRoutes } from './auth'
import { pushRoutes } from './push'
import { storageRoutes } from './storage'
import { classRoutes } from './classes'
import { metaRoutes } from './meta'
import { reportsRoutes } from './reports'
import { questionRoutes } from './questions'
import { schoolRoutes } from './school'
import { messagingRoutes } from './messaging'
import { studyRoutes } from './study'
import { userRoutes } from './users'
import { interactionRoutes } from './interactions'
import { paymentRoutes } from './payment'

export const routes: Route[] = [
	...authRoutes,
	...pushRoutes,
	...storageRoutes,
	...classRoutes,
	...metaRoutes,
	...reportsRoutes,
	...questionRoutes,
	...schoolRoutes,
	...messagingRoutes,
	...studyRoutes,
	...userRoutes,
	...interactionRoutes,
	...paymentRoutes,
	{
		path: '/',
		method: 'get',
		controllers: [
			makeController(async () => {
				return {
					status: StatusCodes.Ok,
					result: `${appId} service running`
				}
			})
		]
	}
]