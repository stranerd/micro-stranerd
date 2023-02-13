import { appInstance } from '@utils/app/types'
import { ClassesUseCases } from '@modules/classes'
import { CoursesUseCases } from '@modules/teachers'
import { AuthRole, OnJoinFn } from '@utils/app/package'

export const registerSockets = () => {
	const isAdmin: OnJoinFn = async ({
		                                 user,
		                                 channel
	                                 }) => user?.roles?.[AuthRole.isStranerdAdmin] ? channel : null
	const isMine: OnJoinFn = async ({ channel, user }) => user ? `${channel}/${user.id}` : null
	const isSubbed: OnJoinFn = async ({
		                                  channel,
		                                  user
	                                  }) => user?.roles[AuthRole.isSubscribed] ? channel : null
	const isOpen: OnJoinFn = async ({ channel }) => channel
	const classJoinCb: OnJoinFn = async (data, params) => {
		const { classId = null } = params
		if (!classId || !data.user) return null
		const classInst = await ClassesUseCases.find(classId)
		if (!classInst?.getAllUsers().includes(data.user.id)) return null
		return await isOpen(data, params)
	}
	const teachersJoinCb: OnJoinFn = async (data, params) => {
		const { courseId = null } = params
		if (!courseId || !data.user) return null
		const course = await CoursesUseCases.find(courseId)
		if (!course?.members.includes(data.user.id)) return null
		return await isOpen(data, params)
	}

	appInstance.server.socketEmitter.register('classes/classes', isOpen)
		.register('classes/:classId/announcements', classJoinCb)
		.register('classes/:classId/groups', classJoinCb)
		.register('classes/:classId/events', classJoinCb)
		.register('classes/:classId/schemes', classJoinCb)
		.register('teachers/courses', isOpen)
		.register('teachers/:courseId/files', teachersJoinCb)
		.register('teachers/:courseId/attendances', teachersJoinCb)
		.register('teachers/:courseId/assignments', teachersJoinCb)
		.register('teachers/:courseId/assignmentSubmissions', teachersJoinCb)
		.register('teachers/:courseId/posts', teachersJoinCb)
		.register('questions/answers', isSubbed)
		.register('questions/questions', isOpen)
		.register('moderation/reports', isAdmin)
		.register('school/courses', isOpen)
		.register('school/departments', isOpen)
		.register('school/faculties', isOpen)
		.register('school/institutions', isOpen)
		.register('school/pastQuestions', isOpen)
		.register('messaging/chats', isMine)
		.register('messaging/chatMetas', isMine)
		.register('study/flashCards', isOpen)
		.register('study/notes', isOpen)
		.register('study/files', isOpen)
		.register('study/sets', isOpen)
		.register('study/testPreps', isOpen)
		.register('study/tests', isMine)
		.register('users/badges', isMine)
		.register('users/connects', isMine)
		.register('users/notifications', isMine)
		.register('users/referrals', isMine)
		.register('users/users', isOpen)
		.register('interactions/comments', isOpen)
		.register('interactions/likes', isOpen)
		.register('interactions/tags', isOpen)
		.register('interactions/views', isOpen)
		.register('payment/plans', isOpen)
		.register('payment/transactions', isMine)
		.register('payment/methods', isMine)
		.register('payment/wallets', isMine)
}