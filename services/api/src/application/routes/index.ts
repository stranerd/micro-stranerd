import { Route } from '@utils/app/package'
import { authRoutes } from './auth'
import { pushRoutes } from './push'
import { storageRoutes } from './storage'
import { classRoutes } from './classes'
import { metaRoutes } from './meta'
import { moderationRoutes } from './moderation'
import { questionRoutes } from './questions'
import { schoolRoutes } from './school'
import { messagingRoutes } from './messaging'
import { studyRoutes } from './study'
import { userRoutes } from './users'
import { interactionRoutes } from './interactions'
import { paymentRoutes } from './payment'
import { teachersRoutes } from './teachers'

export const routes: Route[] = [
	...authRoutes,
	...pushRoutes,
	...storageRoutes,
	...classRoutes,
	...metaRoutes,
	...moderationRoutes,
	...questionRoutes,
	...schoolRoutes,
	...messagingRoutes,
	...studyRoutes,
	...userRoutes,
	...interactionRoutes,
	...paymentRoutes,
	...teachersRoutes
]