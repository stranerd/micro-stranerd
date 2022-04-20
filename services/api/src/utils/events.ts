import { appInstance, CronTypes, DelayedJobs, Events, EventTypes, TypedEmail } from '@utils/commons'
import {
	CreateReferral,
	CreateUserWithBio,
	DeleteOldSeenNotifications,
	MarkUserAsDeleted,
	ResetRankings,
	UpdateUserWithBio,
	UpdateUserWithRoles,
	UserRankings
} from '@modules/users'
import { endSession, startSession } from '@utils/modules/sessions/sessions'
import { FindSession } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { UpdateTest } from '@modules/study'
import { deleteUnverifiedUsers } from '@utils/modules/auth'
import { GetAndDeleteAllErrors } from '@modules/emails'
import { sendMailAndCatchError } from '@utils/modules/email'
import { DeleteUserTokens } from '@modules/push'
import { DeleteFile } from '@modules/storage'
import { sendPushNotification } from '@utils/modules/push'

const eventBus = appInstance.eventBus

export const subscribers = {
	[EventTypes.AUTHNEWREFERRAL]: eventBus.createSubscriber<Events[EventTypes.AUTHNEWREFERRAL]>(EventTypes.AUTHNEWREFERRAL, async (data) => {
		await CreateReferral.execute({ userId: data.referrer, referred: data.referred })
	}),
	[EventTypes.AUTHUSERCREATED]: eventBus.createSubscriber<Events[EventTypes.AUTHUSERCREATED]>(EventTypes.AUTHUSERCREATED, async (data) => {
		await CreateUserWithBio.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHUSERUPDATED]: eventBus.createSubscriber<Events[EventTypes.AUTHUSERUPDATED]>(EventTypes.AUTHUSERUPDATED, async (data) => {
		await UpdateUserWithBio.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHROLESUPDATED]: eventBus.createSubscriber<Events[EventTypes.AUTHROLESUPDATED]>(EventTypes.AUTHROLESUPDATED, async (data) => {
		await UpdateUserWithRoles.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHUSERDELETED]: eventBus.createSubscriber<Events[EventTypes.AUTHUSERDELETED]>(EventTypes.AUTHUSERDELETED, async (data) => {
		await MarkUserAsDeleted.execute({ id: data.id, timestamp: data.timestamp })
		await DeleteUserTokens.execute(data.id)
	}),
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
			await ResetRankings.execute(UserRankings.daily)
			await deleteUnverifiedUsers()
		}
		if (type === CronTypes.weekly) {
			await ResetRankings.execute(UserRankings.weekly)
			await DeleteOldSeenNotifications.execute()
		}
		if (type === CronTypes.monthly) await ResetRankings.execute(UserRankings.monthly)
	}),
	[EventTypes.PUSHNOTIFICATION]: eventBus.createSubscriber<Events[EventTypes.PUSHNOTIFICATION]>(EventTypes.PUSHNOTIFICATION, async (data) => {
		await sendPushNotification(data)
	}),
	[EventTypes.SENDMAIL]: eventBus.createSubscriber<Events[EventTypes.SENDMAIL]>(EventTypes.SENDMAIL, async (data) => {
		await sendMailAndCatchError(data)
	}),
	[EventTypes.TASKSCRON]: eventBus.createSubscriber<Events[EventTypes.TASKSCRON]>(EventTypes.TASKSCRON, async (data) => {
		if (data.type === CronTypes.halfHourly) await appInstance.job.retryAllFailedJobs()
		if (data.type === CronTypes.hourly) {
			const errors = await GetAndDeleteAllErrors.execute()
			await Promise.all(
				errors.map(async (error) => {
					await sendMailAndCatchError(error as unknown as TypedEmail)
				})
			)
		}
	}),
	[EventTypes.DELETEFILE]: eventBus.createSubscriber<Events[EventTypes.DELETEFILE]>(EventTypes.DELETEFILE, async (data) => {
		if (data?.path) await DeleteFile.call(data.path)
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher<Events[EventTypes.SENDMAIL]>(EventTypes.SENDMAIL),
	[EventTypes.DELETEFILE]: eventBus.createPublisher<Events[EventTypes.DELETEFILE]>(EventTypes.DELETEFILE),
	[EventTypes.PUSHNOTIFICATION]: eventBus.createPublisher<Events[EventTypes.PUSHNOTIFICATION]>(EventTypes.PUSHNOTIFICATION),
	[EventTypes.AUTHUSERCREATED]: eventBus.createPublisher<Events[EventTypes.AUTHUSERCREATED]>(EventTypes.AUTHUSERCREATED),
	[EventTypes.AUTHUSERUPDATED]: eventBus.createPublisher<Events[EventTypes.AUTHUSERUPDATED]>(EventTypes.AUTHUSERUPDATED),
	[EventTypes.AUTHROLESUPDATED]: eventBus.createPublisher<Events[EventTypes.AUTHROLESUPDATED]>(EventTypes.AUTHROLESUPDATED),
	[EventTypes.AUTHUSERDELETED]: eventBus.createPublisher<Events[EventTypes.AUTHUSERDELETED]>(EventTypes.AUTHUSERDELETED),
	[EventTypes.AUTHNEWREFERRAL]: eventBus.createPublisher<Events[EventTypes.AUTHNEWREFERRAL]>(EventTypes.AUTHNEWREFERRAL),
	[EventTypes.TASKSCRON]: eventBus.createPublisher<Events[EventTypes.TASKSCRON]>(EventTypes.TASKSCRON),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher<Events[EventTypes.TASKSDELAYED]>(EventTypes.TASKSDELAYED)
}

