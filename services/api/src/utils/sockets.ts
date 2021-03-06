import { OnJoinFn, SupportedAuthRoles } from '@utils/commons'
import { ClassesUseCases } from '@modules/classes'
import { getSocketEmitter } from '@index'

export const registerSockets = () => {
	const isAdmin: OnJoinFn = async ({
		                                 user,
		                                 channel
	                                 }) => user?.roles?.[SupportedAuthRoles.isStranerdAdmin] ? channel : null
	const isMine: OnJoinFn = async ({ channel, user }) => user ? `${channel}/${user.id}` : null
	const isSubbed: OnJoinFn = async ({
		                                  channel,
		                                  user
	                                  }) => user?.roles[SupportedAuthRoles.isSubscribed] ? channel : null
	const isOpen: OnJoinFn = async ({ channel }) => channel
	const classJoinCb: OnJoinFn = async (data, params) => {
		const { classId = null } = params
		if (!classId || !data.user) return null
		const classInst = await ClassesUseCases.find(classId)
		if (!classInst?.getAllUsers().includes(data.user.id)) return null
		return await isOpen(data, params)
	}

	getSocketEmitter().register('classes/classes', isOpen)
	getSocketEmitter().register('classes/announcements/:classId', classJoinCb)
	getSocketEmitter().register('classes/groups/:classId', classJoinCb)
	getSocketEmitter().register('classes/events/:classId', classJoinCb)
	getSocketEmitter().register('classes/schemes/:classId', classJoinCb)
	getSocketEmitter().register('questions/answers', isSubbed)
	getSocketEmitter().register('questions/questions', isOpen)
	getSocketEmitter().register('reports/reports', isAdmin)
	getSocketEmitter().register('school/courses', isOpen)
	getSocketEmitter().register('school/departments', isOpen)
	getSocketEmitter().register('school/faculties', isOpen)
	getSocketEmitter().register('school/institutions', isOpen)
	getSocketEmitter().register('school/pastQuestions', isOpen)
	getSocketEmitter().register('messaging/chats', isMine)
	getSocketEmitter().register('messaging/chatMetas', isMine)
	getSocketEmitter().register('messaging/sessions', isMine)
	getSocketEmitter().register('study/flashCards', isOpen)
	getSocketEmitter().register('study/notes', isOpen)
	getSocketEmitter().register('study/files', isOpen)
	getSocketEmitter().register('study/sets', isOpen)
	getSocketEmitter().register('study/testPreps', isOpen)
	getSocketEmitter().register('study/tests', isMine)
	getSocketEmitter().register('users/badges', isMine)
	getSocketEmitter().register('users/connects', isMine)
	getSocketEmitter().register('users/notifications', isMine)
	getSocketEmitter().register('users/referrals', isMine)
	getSocketEmitter().register('users/reviews', isOpen)
	getSocketEmitter().register('users/users', isOpen)
	getSocketEmitter().register('interactions/comments', isOpen)
	getSocketEmitter().register('interactions/likes', isOpen)
	getSocketEmitter().register('interactions/tags', isOpen)
	getSocketEmitter().register('interactions/views', isOpen)
	getSocketEmitter().register('payment/plans', isOpen)
	getSocketEmitter().register('payment/transactions', isMine)
	getSocketEmitter().register('payment/cards', isMine)
	getSocketEmitter().register('payment/wallets', isMine)
}