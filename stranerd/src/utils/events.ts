import { CronTypes, DelayedJobs, EventBus, EventTypes } from '@utils/commons'
import {
	CreateReferral,
	CreateUserWithBio,
	DeleteOldSeenNotifications,
	MarkUserAsDeleted,
	ResetRankings,
	UpdateUserWithBio,
	UpdateUserWithRoles
} from '../modules/users'
import { endSession, startSession } from '@utils/modules/sessions/sessions'
import { FindSession } from '@modules/sessions'

const eventBus = new EventBus()

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
			// TODO: send reminder to tutor and session
			console.log(sessionId, studentId, tutorId, timeInSec)
		}
	}),
	[EventTypes.TASKSCRON]: eventBus.createSubscriber(EventTypes.TASKSCRON, async ({ type }) => {
		if (type === CronTypes.daily) await ResetRankings.execute('daily')
		if (type === CronTypes.weekly) {
			await ResetRankings.execute('weekly')
			await DeleteOldSeenNotifications.execute()
		}
		if (type === CronTypes.monthly) await ResetRankings.execute('monthly')
	})
}

export const publishers = {
	[EventTypes.SENDMAIL]: eventBus.createPublisher(EventTypes.SENDMAIL),
	[EventTypes.DELETEFILE]: eventBus.createPublisher(EventTypes.DELETEFILE)
}
