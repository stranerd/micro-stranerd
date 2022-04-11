import { appInstance, AuthApps, getNewServerInstance, OnJoinFn } from '@utils/commons'
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

	const isAdmin: OnJoinFn = async ({ user, channel }) => user?.roles[AuthApps.Stranerd]?.isAdmin ? channel : null

	const classJoinCb: OnJoinFn = async (data, params) => {
		const { classId = null } = params
		if (!classId || !data.user) return null
		const classInst = await FindClass.execute(classId)
		if (!classInst?.getAllUsers().includes(data.user.id)) return null
		return await getSocketEmitter().quickRegisters.isOpen(data, params)
	}

	getSocketEmitter().register('classes/classes', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('classes/announcements/:classId', classJoinCb)
	getSocketEmitter().register('classes/discussions/:classId', classJoinCb)
	getSocketEmitter().register('classes/groups/:classId', classJoinCb)
	getSocketEmitter().register('questions/answerComments', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('questions/answers', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('questions/answerUpvotes', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('questions/questions', getSocketEmitter().quickRegisters.isOpen)
	getSocketEmitter().register('reports/reports', isAdmin)
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
	await appInstance.logger.success(`${appId} api has started listening on port`, port)
}

start().then()