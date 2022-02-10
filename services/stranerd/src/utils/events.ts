import { CronTypes, DelayedJobs, eventBus, EventTypes } from '@utils/commons'
import {
	CreateReferral,
	CreateUserWithBio,
	DeleteOldSeenNotifications,
	MarkUserAsDeleted,
	ResetRankings,
	UpdateUserWithBio,
	UpdateUserWithRoles,
	UserRankings
} from '../modules/users'
import { endSession, startSession } from '@utils/modules/sessions/sessions'
import { FindSession } from '@modules/sessions'
import { sendNotification } from '@utils/modules/users/notifications'
import { UpdateTest } from '@modules/study'

export const subscribers = {
	[EventTypes.AUTHNEWREFERRAL]: eventBus.createSubscriber(EventTypes.AUTHNEWREFERRAL, async (data) => {
		await CreateReferral.execute({ userId: data.referrer, referred: data.referred })
	}),
	[EventTypes.AUTHUSERCREATED]: eventBus.createSubscriber(EventTypes.AUTHUSERCREATED, async (data) => {
		await CreateUserWithBio.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHUSERUPDATED]: eventBus.createSubscriber(EventTypes.AUTHUSERUPDATED, async (data) => {
		await UpdateUserWithBio.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHROLESUPDATED]: eventBus.createSubscriber(EventTypes.AUTHROLESUPDATED, async (data) => {
		await UpdateUserWithRoles.execute({ id: data.id, data: data.data, timestamp: data.timestamp })
	}),
	[EventTypes.AUTHUSERDELETED]: eventBus.createSubscriber(EventTypes.AUTHUSERDELETED, async (data) => {
		await MarkUserAsDeleted.execute({ id: data.id, timestamp: data.timestamp })
	}),
	[EventTypes.TASKSDELAYED]: eventBus.createSubscriber(EventTypes.TASKSDELAYED, async (data) => {
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
	[EventTypes.TASKSCRON]: eventBus.createSubscriber(EventTypes.TASKSCRON, async ({ type }) => {
		if (type === CronTypes.daily) {
			await ResetRankings.execute(UserRankings.daily)
		}
		if (type === CronTypes.weekly) {
			await ResetRankings.execute(UserRankings.weekly)
			await DeleteOldSeenNotifications.execute()
		}
		if (type === CronTypes.monthly) await ResetRankings.execute(UserRankings.monthly)
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher(EventTypes.SENDMAIL),
	[EventTypes.DELETEFILE]: eventBus.createPublisher(EventTypes.DELETEFILE),
	[EventTypes.PUSHNOTIFICATION]: eventBus.createPublisher(EventTypes.PUSHNOTIFICATION)
}
