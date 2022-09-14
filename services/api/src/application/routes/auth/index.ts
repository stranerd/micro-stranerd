import { emailRoutes } from './emails'
import { identitiesRoutes } from './identities'
import { passwordsRoutes } from './passwords'
import { tokenRoutes } from './token'
import { userRoutes } from './user'
import { Route } from '@utils/app/package'

export const authRoutes: Route[] = [
	...emailRoutes,
	...identitiesRoutes,
	...passwordsRoutes,
	...tokenRoutes,
	...userRoutes
]