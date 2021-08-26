import { getNewServerInstance, Logger, setupMongooseConnection } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { routes } from './application/routes'

const start = async () => {
	await setupMongooseConnection()
	const app = getNewServerInstance(routes)
	await app.start(port)
	await Logger.info(`${ appId } api has started listening on port`, port)

	await Promise.all(
		Object.values(subscribers)
			.map(async (subscriber) => {
				await subscriber.subscribe()
			})
	)
}

start().then()