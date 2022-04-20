import { MarkSessionDone, SessionEntity, UpdateTaskIdsAndTimes } from '@modules/sessions'
import { appInstance, DelayedJobs } from '@utils/commons'
import { SetUsersCurrentSession } from '@modules/users'

export const startSession = async (session: SessionEntity) => {
	await SetUsersCurrentSession.execute({
		studentId: session.studentId,
		tutorId: session.tutorId,
		sessionId: session.id,
		add: true
	})
}

export const startSessionTimer = async (session: SessionEntity) => {
	if (session.startedAt) return

	const delay = session.duration * 60 * 1000
	const taskId = await appInstance.job.addDelayedJob({
		type: DelayedJobs.SessionTimer,
		data: { sessionId: session.id }
	}, delay)
	await UpdateTaskIdsAndTimes.execute({
		sessionId: session.id,
		data: { delayInMs: delay, startedAt: Date.now(), taskIds: [taskId] }
	})
}

export const scheduleSession = async (session: SessionEntity) => {
	const { id: sessionId, studentId, tutorId, isScheduled, scheduledAt } = session
	if (!isScheduled) return
	const delayTillStart = scheduledAt! - Date.now()
	const reminders = [0, 5, 15, 60].map((time) => delayTillStart - (time * 60 * 1000)).filter((delay) => delay >= 0)
	const taskIds = [] as (string | number)[]
	if (delayTillStart >= 0) taskIds.push(await appInstance.job.addDelayedJob({
		type: DelayedJobs.ScheduledSessionStart,
		data: { sessionId, studentId, tutorId }
	}, delayTillStart))
	await Promise.all(
		reminders.map(async (delay) => taskIds.push(await appInstance.job.addDelayedJob({
			type: DelayedJobs.ScheduledSessionNotification,
			data: { sessionId, studentId, tutorId, timeInSec: 0 }
		}, delay))))
	await UpdateTaskIdsAndTimes.execute({
		sessionId: session.id,
		data: { taskIds }
	})
}

export const extendSessionTime = async (session: SessionEntity, extensionInMinutes: number) => {
	if (!session.endedAt) return

	const msLeft = session.endedAt - Date.now()
	if (msLeft <= 0) return
	const delay = msLeft + (extensionInMinutes * 60 * 1000)

	await cancelSessionTask(session)

	const taskId = await appInstance.job.addDelayedJob({
		type: DelayedJobs.SessionTimer,
		data: { sessionId: session.id }
	}, delay)
	await UpdateTaskIdsAndTimes.execute({
		sessionId: session.id,
		data: { delayInMs: delay, taskIds: [taskId] }
	})
}

export const endSession = async (sessionId: string) => await MarkSessionDone.execute(sessionId)

export const cancelSessionTask = async (session: SessionEntity) => await Promise.all(session.taskIds.map(appInstance.job.removeDelayedJob))