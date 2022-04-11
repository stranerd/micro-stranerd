import { appInstance, getNewServerInstance } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { routes } from '@application/routes'

const app = getNewServerInstance(routes, {
	onConnect: async () => {
	},
	onDisconnect: async () => {
	}
})
export const getSocketEmitter = () => app.socketEmitter

const start = async () => {
	await appInstance.startDbConnection()
	await Promise.all(
		Object.values(subscribers)
			.map(async (subscriber) => {
				await subscriber.subscribe()
			})
	)
	await app.start(port)
	await appInstance.logger.success(`${appId} api has started listening on port`, port)
}

start().then()