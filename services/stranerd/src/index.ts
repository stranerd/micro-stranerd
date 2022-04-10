import { getNewServerInstance, Logger, setupMongooseConnection } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { routes } from '@application/routes'
import { ResetAllUsersStatus, UpdateUserStatus } from '@modules/users'

const app = getNewServerInstance(routes, {
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

	getSocketEmitter().register('classes/announcements', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('classes/classes', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('classes/discussions', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('classes/groups', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('questions/answerComments', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('questions/answers', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('questions/answerUpvotes', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('questions/questions', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('reports/reports', getSocketEmitter().quickRegisters.isAdmin)
	getSocketEmitter().register('school/courses', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('school/departments', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('school/faculties', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('school/institutions', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('school/pastQuestions', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('sessions/chats', getSocketEmitter().quickRegisters.isMine)
	getSocketEmitter().register('sessions/chatMetas', getSocketEmitter().quickRegisters.isMine)
	getSocketEmitter().register('sessions/sessions', getSocketEmitter().quickRegisters.isMine)
	getSocketEmitter().register('study/comments', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('study/flashCards', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('study/notes', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('study/sets', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('study/testPreps', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('study/tests', getSocketEmitter().quickRegisters.isMine)
	getSocketEmitter().register('study/videos', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('users/badges', getSocketEmitter().quickRegisters.isMine)
	getSocketEmitter().register('users/notifications', getSocketEmitter().quickRegisters.isMine)
	getSocketEmitter().register('users/referrals', getSocketEmitter().quickRegisters.isMine)
	getSocketEmitter().register('users/reviews', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('users/users', getSocketEmitter().quickRegisters.isOpen)

	await ResetAllUsersStatus.execute()
	await app.start(port)
	await Logger.success(`${appId} api has started listening on port`, port)
}

start().then()