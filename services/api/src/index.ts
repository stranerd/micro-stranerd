import { appInstance, getNewServerInstance } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { routes } from '@application/routes'
import { UsersUseCases } from '@modules/users'
import { registerSockets } from '@utils/sockets'
import { initializeApp } from 'firebase-admin/app'
import { startJobs } from '@utils/jobs'

const app = getNewServerInstance(routes, {
	onConnect: async (userId, socketId) => {
		await UsersUseCases.updateStatus({
			userId, socketId, add: true
		})
		await UsersUseCases.updateStreak(userId)
	},
	onDisconnect: async (userId, socketId) => {
		await UsersUseCases.updateStatus({
			userId, socketId, add: false
		})
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

	await registerSockets()
	await UsersUseCases.resetAllUsersStatus()
	await app.start(port)
	await appInstance.logger.success(`${appId} api has started listening on port`, port)
	await startJobs()
}

start().then()