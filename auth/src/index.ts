import { getNewServerInstance } from '@utils/commons'
import { port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { logger } from '@utils/logger'
import { routes } from './server/routes'

const start = async () => {
	const app = getNewServerInstance(routes)
	await app.start(port)
	await logger.info('auth api has started listening on port', port)

	await Promise.all(
		Object.values(subscribers)
			.map(async (subscriber) => {
				await subscriber.subscribe()
			})
	)
}

start().then()