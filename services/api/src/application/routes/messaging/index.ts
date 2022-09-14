import { Route } from '@utils/app/package'
import { chatMetaRoutes } from './chatMeta'
import { chatRoutes } from './chat'

export const messagingRoutes: Route[] = [
	...chatMetaRoutes,
	...chatRoutes
]