import { Route } from '@utils/commons'
import { sessionRoutes } from './session'
import { chatMetaRoutes } from './chatMeta'
import { chatRoutes } from './chat'

export const messagingRoutes: Route[] = [
	...sessionRoutes,
	...chatMetaRoutes,
	...chatRoutes
]