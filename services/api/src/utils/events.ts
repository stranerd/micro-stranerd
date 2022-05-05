import { appInstance, CronTypes, DelayedJobs, Events, EventTypes } from '@utils/commons'
import { NotificationsUseCases, UserRankings, UsersUseCases } from '@modules/users'
import { endSession, startSession } from '@utils/modules/sessions/sessions'
import { FindSession } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { UpdateTest } from '@modules/study'
import { deleteUnverifiedUsers } from '@utils/modules/auth'
import { EmailErrorsUseCases } from '@modules/emails'
import { sendMailAndCatchError } from '@utils/modules/email'
import { UploaderUseCases } from '@modules/storage'

const eventBus = appInstance.eventBus

export const subscribers = {
	[EventTypes.TASKSDELAYED]: eventBus.createSubscriber<Events[EventTypes.TASKSDELAYED]>(EventTypes.TASKSDELAYED, async (data) => {
		if (data.type === DelayedJobs.SessionTimer) await endSession(data.data.sessionId)
		if (data.type === DelayedJobs.ScheduledSessionStart) {
			const { sessionId, studentId: userId } = data.data
			const session = await FindSession.execute({ sessionId, userId })
			if (session) await startSession(session)
		}
		if (data.type === DelayedJobs.ScheduledSessionNotification) {
			const { sessionId, studentId, tutorId, timeInSec } = data.data
			await Promise.all([
				await sendNotification(tutorId, {
					title: 'Session Timer',
					body: timeInSec > 0 ? `Your session will start in ${timeInSec / 60} minutes` : 'Your session is starting now',
					action: 'sessions',
					data: { userId: studentId, sessionId }
				}),
				await sendNotification(studentId, {
					title: 'Session Timer',
					body: timeInSec > 0 ? `Your session will start in ${timeInSec / 60} minutes` : 'Your session is starting now',
					action: 'sessions',
					data: { userId: tutorId, sessionId }
				})
			])
		}
		if (data.type === DelayedJobs.TestTimer) await UpdateTest.execute({
			id: data.data.testId,
			userId: data.data.userId,
			data: { done: true }
		})
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
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher<Events[EventTypes.TASKSDELAYED]>(EventTypes.TASKSDELAYED)
}
