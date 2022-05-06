import { NotificationsUseCases, NotificationToModel } from '@modules/users'

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
type ClassEventsData = { action: 'classEvents', data: { classId: string, eventId: string } }

type NotificationData =
	Omit<NotificationToModel, 'userId'>
	& (QuestionData | AnswerData | QuestionCommentData | AnswerCommentData | SessionData | UserData | AccountData | RoleData | AnnouncementData | ClassesData | ClassEventsData)

export const sendNotification = async (userIds: string[], data: NotificationData) => {
	await NotificationsUseCases.create(userIds.map((userId) => ({ ...data, userId })))
}
