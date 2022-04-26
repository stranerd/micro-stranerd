import { UsersUseCases, NotificationsUseCases, NotificationToModel } from '@modules/users'
import { publishers } from '@utils/events'
import { EmailsList, EventTypes, readEmailFromPug } from '@utils/commons'
import { clientDomain } from '@utils/environment'

type QuestionData = { action: 'questions', data: { questionId: string } }
type AnswerData = { action: 'answers', data: { questionId: string, answerId: string } }
type QuestionCommentData = { action: 'questionComments', data: { questionId: string, commentId: string } }
type AnswerCommentData = { action: 'answerComments', data: { questionId: string, answerId: string, commentId: string } }
type SessionData = { action: 'sessions', data: { userId: string, sessionId: string } }
type UserData = { action: 'users', data: { userId: string } }
type AccountData = { action: 'account', data: { profile?: true, wallet?: true } }
type RoleData = { action: 'roles', data: { admin?: true, tutor?: true } }
type AnnouncementData = { action: 'announcements', data: { classId: string, announcementId: string } }
type ClassesData = { action: 'classes', data: { classId: string } }

type NotificationData =
	Omit<NotificationToModel, 'userId'>
	& (QuestionData | AnswerData | QuestionCommentData | AnswerCommentData | SessionData | UserData | AccountData | RoleData | AnnouncementData | ClassesData)

export const sendNotification = async (userId: string, data: NotificationData & { title: string }, asEmail = false) => {
	await NotificationsUseCases.create([{ ...data, userId }])
	if (asEmail) {
		const user = await UsersUseCases.find(userId)
		if (user) {
			const content = await readEmailFromPug('emails/newNotification.pug', {
				notification: data,
				meta: { link: clientDomain }
			})
			await publishers[EventTypes.SENDMAIL].publish({
				from: EmailsList.NO_REPLY,
				to: user.bio.email,
				subject: data.title,
				content,
				data: {
					attachments: { logoWhite: true }
				}
			})
		}
	}
}

export const broadcastNotifications = async (userIds: string[], data: NotificationData & { title: string }) => {
	await NotificationsUseCases.create(userIds.map((userId) => ({ ...data, userId })))
}
