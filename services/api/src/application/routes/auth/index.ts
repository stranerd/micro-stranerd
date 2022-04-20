import { emailRoutes } from './emails'
import { identitiesRoutes } from './identities'
import { passwordsRoutes } from './passwords'
import { tokenRoutes } from './token'
import { userRoutes } from './user'

export default [
	...emailRoutes,
	...identitiesRoutes,
	...passwordsRoutes,
	...tokenRoutes,
	...userRoutes
]