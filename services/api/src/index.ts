import { routes } from '@application/routes'
import { PlansUseCases } from '@modules/payment'
import { UsersUseCases } from '@modules/users'
import { getNewServerInstance } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { startJobs } from '@utils/jobs'
import { plansList } from '@utils/modules/payment/plans'
import { registerSockets } from '@utils/sockets'
import { initializeApp } from 'firebase-admin/app'

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
	await PlansUseCases.init(plansList)
	await app.start(port)
	await appInstance.logger.success(`${appId} service has started listening on port`, port)
	await startJobs()
}

start().then()