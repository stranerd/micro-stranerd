import { appInstance, getNewServerInstance, OnJoinFn, SupportedAuthRoles } from '@utils/commons'
import { appId, port } from '@utils/environment'
import { subscribers } from '@utils/events'
import { routes } from '@application/routes'
import { ResetAllUsersStatus, UpdateUserStatus } from '@modules/users'
import { FindClass } from '@modules/classes'

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
	await appInstance.startDbConnection()
	await Promise.all(
		Object.values(subscribers)
			.map(async (subscriber) => {
				await subscriber.subscribe()
			})
	)

	const isAdmin: OnJoinFn = async ({
		                                 user,
		                                 channel
	                                 }) => user?.roles?.[SupportedAuthRoles.isStranerdAdmin] ? channel : null
	const isMine: OnJoinFn = async ({ channel, user }) => user ? `${channel}/${user.id}` : null
	const isOpen: OnJoinFn = async ({ channel }) => channel
	const classJoinCb: OnJoinFn = async (data, params) => {
		const { classId = null } = params
		if (!classId || !data.user) return null
		const classInst = await FindClass.execute(classId)
		if (!classInst?.getAllUsers().includes(data.user.id)) return null
		return await isOpen(data, params)
	}

	getSocketEmitter().register('classes/classes', isOpen)
	getSocketEmitter().register('classes/announcements/:classId', classJoinCb)
	getSocketEmitter().register('classes/discussions/:classId', classJoinCb)
	getSocketEmitter().register('classes/groups/:classId', classJoinCb)
	getSocketEmitter().register('questions/answerComments', isOpen)
	getSocketEmitter().register('questions/answers', isOpen)
	getSocketEmitter().register('questions/answerUpvotes', isOpen)
	getSocketEmitter().register('questions/questions', isOpen)
	getSocketEmitter().register('reports/reports', isAdmin)
	getSocketEmitter().register('school/courses', isOpen)
	getSocketEmitter().register('school/departments', isOpen)
	getSocketEmitter().register('school/faculties', isOpen)
	getSocketEmitter().register('school/institutions', isOpen)
	getSocketEmitter().register('school/pastQuestions', isOpen)
	getSocketEmitter().register('sessions/chats', isMine)
	getSocketEmitter().register('sessions/chatMetas', isMine)
	getSocketEmitter().register('sessions/sessions', isMine)
	getSocketEmitter().register('study/comments', isOpen)
	getSocketEmitter().register('study/flashCards', isOpen)
	getSocketEmitter().register('study/notes', isOpen)
	getSocketEmitter().register('study/sets', isOpen)
	getSocketEmitter().register('study/testPreps', isOpen)
	getSocketEmitter().register('study/tests', isMine)
	getSocketEmitter().register('study/videos', isOpen)
	getSocketEmitter().register('users/badges', isMine)
	getSocketEmitter().register('users/notifications', isMine)
	getSocketEmitter().register('users/referrals', isMine)
	getSocketEmitter().register('users/reviews', isOpen)
	getSocketEmitter().register('users/users', isOpen)

	await ResetAllUsersStatus.execute()
	await app.start(port)
	await appInstance.logger.success(`${appId} api has started listening on port`, port)
}

start().then()