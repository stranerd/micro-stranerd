import {
	EventTypes,
	getNewServerInstance,
	Logger,
	setupMongooseConnection,
	startProcessingQueues
} from '@utils/commons'
import { appId, port } from '@utils/environment'
import { publishers, subscribers } from '@utils/events'
import { routes } from '@application/routes'

const app = getNewServerInstance(routes, { mine: [], admin: [], open: [] }, {
	onConnect: async () => {
	},
	onDisconnect: async () => {
	}
})
export const getSocketEmitter = () => app.socketEmitter

const start = async () => {
	await setupMongooseConnection()
	await Promise.all(
		Object.values(subscribers)
			.map(async (subscriber) => {
				await subscriber.subscribe()
			})
	)
	await app.start(port)
	await Logger.info(`${appId} api has started listening on port`, port)
	await startProcessingQueues({
		onDelayed: async (data) => {
			await publishers[EventTypes.TASKSDELAYED].publish(data)
		},
		onCron: async (type) => {
			await publishers[EventTypes.TASKSCRON].publish({ type })
		}
	})
}

start().then()