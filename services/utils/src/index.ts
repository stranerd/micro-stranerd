import { appInstance, DelayedEvent, EventTypes, getNewServerInstance } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { publishers, subscribers } from '@utils/events'
import { routes } from '@application/routes'
import { initializeApp } from 'firebase-admin/app'

const app = getNewServerInstance(routes, {
	onConnect: async () => {
	},
	onDisconnect: async () => {
	}
})
export const getSocketEmitter = () => app.socketEmitter

const start = async () => {
	initializeApp()
	await appInstance.startDbConnection()
	await Promise.all(
		Object.values(subscribers)
			.map(async (subscriber) => {
				await subscriber.subscribe()
			})
	)
	await app.start(port)
	await appInstance.logger.success(`${appId} api has started listening on port`, port)
	await appInstance.job.startProcessingQueues<DelayedEvent>({
		onDelayed: async (data) => {
			await publishers[EventTypes.TASKSDELAYED].publish(data)
		},
		onCron: async (type) => {
			await publishers[EventTypes.TASKSCRON].publish({ type })
		}
	})
}

start().then()