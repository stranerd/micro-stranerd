import { appInstance, CronLikeJobs, CronTypes, DelayedJobs, Events, EventTypes } from '@utils/commons'
import { NotificationsUseCases, NotificationType, UserRankings, UsersUseCases } from '@modules/users'
import { endSession, startSession } from '@utils/modules/messaging/sessions'
import { SessionsUseCases } from '@modules/messaging'
import { sendNotification } from '@utils/modules/users/notifications'
import { TestsUseCases } from '@modules/study'
import { deleteUnverifiedUsers } from '@utils/modules/auth'
import { EmailErrorsUseCases } from '@modules/emails'
import { sendMailAndCatchError } from '@utils/modules/email'
import { UploaderUseCases } from '@modules/storage'
import { broadcastEvent } from '@utils/modules/classes/events'

const eventBus = appInstance.eventBus

export const subscribers = {
	[EventTypes.TASKSDELAYED]: eventBus.createSubscriber<Events[EventTypes.TASKSDELAYED]>(EventTypes.TASKSDELAYED, async (data) => {
		if (data.type === DelayedJobs.SessionTimer) await endSession(data.data.sessionId)
		if (data.type === DelayedJobs.ScheduledSessionStart) {
			const { sessionId, studentId: userId } = data.data
			const session = await SessionsUseCases.find({ sessionId, userId })
			if (session) await startSession(session)
		}
		if (data.type === DelayedJobs.ScheduledSessionNotification) {
			const { sessionId, studentId, tutorId, timeInMin } = data.data
			await sendNotification([studentId], {
				title: 'Session Timer',
				body: timeInMin > 0 ? `Your session will start in ${timeInMin} minutes` : 'Your session is starting now',
				data: { type: NotificationType.sessions, userId: tutorId, sessionId },
				sendEmail: false
			})
			await sendNotification([tutorId], {
				title: 'Session Timer',
				body: timeInMin > 0 ? `Your session will start in ${timeInMin} minutes` : 'Your session is starting now',
				data: { type: NotificationType.sessions, userId: studentId, sessionId },
				sendEmail: false
			})
		}
		if (data.type === DelayedJobs.TestTimer) await TestsUseCases.update({
			id: data.data.testId,
			userId: data.data.userId,
			data: { done: true }
		})
		if (data.type === DelayedJobs.ClassEvent) await broadcastEvent(data.data.eventId, data.data.timeInMin)
	}),
	[EventTypes.TASKSCRONLIKE]: eventBus.createSubscriber<Events[EventTypes.TASKSCRONLIKE]>(EventTypes.TASKSCRONLIKE, async (data) => {
		if (data.type === CronLikeJobs.ClassEvent) await broadcastEvent(data.data.eventId, data.data.timeInMin)
	}),
	[EventTypes.TASKSCRON]: eventBus.createSubscriber<Events[EventTypes.TASKSCRON]>(EventTypes.TASKSCRON, async ({ type }) => {
		if (type === CronTypes.daily) {
			await UsersUseCases.resetRankings(UserRankings.daily)
			await deleteUnverifiedUsers()
		}
		if (type === CronTypes.weekly) {
			await UsersUseCases.resetRankings(UserRankings.weekly)
			await NotificationsUseCases.deleteOldSeen()
		}
		if (type === CronTypes.monthly) await UsersUseCases.resetRankings(UserRankings.monthly)
		if (type === CronTypes.hourly) {
			const errors = await EmailErrorsUseCases.getAndDeleteAll()
			await Promise.all(
				errors.map(async (error) => {
					await sendMailAndCatchError(error)
				})
			)
			await appInstance.job.retryAllFailedJobs()
		}
	}),
	[EventTypes.SENDMAIL]: eventBus.createSubscriber<Events[EventTypes.SENDMAIL]>(EventTypes.SENDMAIL, async (data) => {
		await sendMailAndCatchError(data)
	}),
	[EventTypes.DELETEFILE]: eventBus.createSubscriber<Events[EventTypes.DELETEFILE]>(EventTypes.DELETEFILE, async (data) => {
		if (data?.path) await UploaderUseCases.delete(data.path)
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher<Events[EventTypes.SENDMAIL]>(EventTypes.SENDMAIL),
	[EventTypes.DELETEFILE]: eventBus.createPublisher<Events[EventTypes.DELETEFILE]>(EventTypes.DELETEFILE),
	[EventTypes.TASKSCRON]: eventBus.createPublisher<Events[EventTypes.TASKSCRON]>(EventTypes.TASKSCRON),
	[EventTypes.TASKSCRONLIKE]: eventBus.createPublisher<Events[EventTypes.TASKSCRONLIKE]>(EventTypes.TASKSCRONLIKE),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher<Events[EventTypes.TASKSDELAYED]>(EventTypes.TASKSDELAYED)
}
