import { getNewServerInstance, Logger, setupMongooseConnection } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { routes } from '@application/routes'
import { ResetAllUsersStatus, UpdateUserStatus } from '@modules/users'

const app = getNewServerInstance(routes, {
	mine: ['notifications', 'referrals', 'chats', 'chatMetas', 'sessions', 'sets', 'tests'],
	admin: ['reports', 'pastQuestions', 'testPreps'],
	open: [
		'users', 'reviews', 'badges',
		'answerComments', 'answers', 'answerUpvotes', 'questions', 'subjects',
		'courses', 'notes', 'institutions', 'studyComments', 'videos', 'flashCards'
	]
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
	await ResetAllUsersStatus.execute()
	await app.start(port)
	await Logger.success(`${appId} api has started listening on port`, port)
}

start().then()