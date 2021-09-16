import { getNewServerInstance, Logger, setupMongooseConnection } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { routes } from '@application/routes'
import { UpdateUserStatus } from '@modules/users'

const app = getNewServerInstance(routes, {
	mine: ['notifications', 'transactions', 'referrals', 'chats', 'chatMetas', 'sessions', 'payments'],
	admin: ['reports'],
	open: ['users', 'reviews', 'answerComments', 'answers', 'answerUpvotes', 'questions', 'subjects', 'tags']
}, {
	onConnect: async (userId, socketId) => {
		await UpdateUserStatus.execute({
			userId, socketId, add: true
		})
	},
	onDisconnect: async (userId, socketId) => {
		await UpdateUserStatus.execute({
			userId, socketId, add: false
		})
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
}

start().then()