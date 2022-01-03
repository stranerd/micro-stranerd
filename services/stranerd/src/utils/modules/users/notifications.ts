import { CreateNotification, FindUser, NotificationToModel } from '@modules/users'
import { publishers } from '@utils/events'
import { Emails, EventTypes, readEmailFromPug } from '@utils/commons'
import { clientDomain } from '@utils/environment'

type QuestionData = { action: 'questions', data: { questionId: string } }
type AnswerData = { action: 'answers', data: { questionId: string, answerId: string } }
type QuestionCommentData = { action: 'questionComments', data: { questionId: string, commentId: string } }
type AnswerCommentData = { action: 'answerComments', data: { questionId: string, answerId: string, commentId: string } }
type SessionData = { action: 'sessions', data: { userId: string, sessionId: string } }
type UserData = { action: 'users', data: { userId: string } }
type AccountData = { action: 'account', data: { profile?: true, wallet?: true } }
type RoleData = { action: 'roles', data: { admin?: true, tutor?: true } }

type NotificationData =
	Omit<NotificationToModel, 'userId'>
	& (QuestionData | AnswerData | QuestionCommentData | AnswerCommentData | SessionData | UserData | AccountData | RoleData)

export const sendNotification = async (userId: string, data: NotificationData, title?: string) => {
	if (title) {
		const user = await FindUser.execute(userId)
		if (user) {
			const content = await readEmailFromPug('emails/newNotification.pug', {
				notification: { ...data, title },
				meta: { link: clientDomain /* + getNotificationLink(data) */ }
			})
			await publishers[EventTypes.SENDMAIL].publish({
				from: Emails.NO_REPLY,
				to: user.bio.email,
				subject: title,
				content,
				attachments: { logoWhite: true }
			})
		}
	} else await CreateNotification.execute({ ...data, userId })
}

/* const getNotificationLink = (notification: NotificationData): string => {
 if (notification.action === 'questions') return `/questions/${notification.data.questionId}`
 else if (notification.action === 'answers') return `/questions/${notification.data.questionId}#${notification.data.answerId}`
 else if (notification.action === 'questionComments') return `/questions/${notification.data.questionId}`
 else if (notification.action === 'answerComments') return `/questions/${notification.data.questionId}#${notification.data.answerId}`
 else if (notification.action === 'sessions') return `/sessions/${notification.data.userId}`
 else if (notification.action === 'users') return `/users/${notification.data.userId}`
 else if (notification.action === 'account') {
 if (notification.data.wallet) return '/account/e-wallet'
 else return '/account/'
 } else if (notification.action === 'roles') {
 if (notification.data.admin) return '/admin/users/admins'
 if (notification.data.tutor) return '/admin/users/tutors'
 }
 return '/dashboard'
 } */