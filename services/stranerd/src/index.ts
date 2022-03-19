import { getNewServerInstance, Logger, setupMongooseConnection } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { routes } from '@application/routes'
import { ResetAllUsersStatus, UpdateUserStatus } from '@modules/users'

const app = getNewServerInstance(routes, {
	mine: [
		'users/notifications', 'users/referrals',
		'sessions/chats', 'sessions/chatMetas', 'sessions/sessions',
		'study/tests'
	],
	admin: [
		'reports/reports',
		'study/pastQuestions'
	],
	open: [
		'users/users', 'users/reviews', 'users/badges',
		'questions/answerComments', 'questions/answers', 'questions/answerUpvotes', 'questions/questions',
		'study/notes', 'study/comments', 'study/videos', 'study/flashCards', 'study/sets', 'study/testPreps',
		'school/courses', 'school/institutions', 'school/faculties', 'school/departments',
		'classes/classes', 'classes/groups', 'classes/discussions', 'classes/announcements'
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