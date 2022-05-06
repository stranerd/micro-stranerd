import { SessionEntity, SessionsUseCases } from '@modules/sessions'
import { appInstance, DelayedEvent, DelayedJobs } from '@utils/commons'
import { UsersUseCases } from '@modules/users'

export const startSession = async (session: SessionEntity) => {
	await UsersUseCases.setCurrentSession({
		studentId: session.student.id,
		tutorId: session.tutor.id,
		sessionId: session.id,
		add: true
	})
}

export const startSessionTimer = async (session: SessionEntity) => {
	if (session.startedAt) return

	const delay = session.duration * 60 * 1000
	const taskId = await appInstance.job.addDelayedJob<DelayedEvent>({
		type: DelayedJobs.SessionTimer,
		data: { sessionId: session.id }
	}, delay)
	await SessionsUseCases.updateTaskIdsAndTimes({
		sessionId: session.id,
		data: { delayInMs: delay, startedAt: Date.now(), taskIds: [taskId] }
	})
}

export const scheduleSession = async (session: SessionEntity) => {
	const { id: sessionId, student, tutor, isScheduled, scheduledAt } = session
	if (!isScheduled) return
	const delayTillStart = scheduledAt! - Date.now()
	const reminders = [0, 5, 15, 60].map((time) => delayTillStart - (time * 60 * 1000)).filter((delay) => delay >= 0)
	const taskIds: string[] = []
	if (delayTillStart >= 0) taskIds.push(await appInstance.job.addDelayedJob<DelayedEvent>({
		type: DelayedJobs.ScheduledSessionStart,
		data: { sessionId, studentId: student.id, tutorId: tutor.id }
	}, delayTillStart))
	await Promise.all(
		reminders.map(async (delay) => taskIds.push(await appInstance.job.addDelayedJob<DelayedEvent>({
			type: DelayedJobs.ScheduledSessionNotification,
			data: { sessionId, studentId: student.id, tutorId: tutor.id, timeInSec: 0 }
		}, delay))))
	await SessionsUseCases.updateTaskIdsAndTimes({
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

	const taskId = await appInstance.job.addDelayedJob<DelayedEvent>({
		type: DelayedJobs.SessionTimer,
		data: { sessionId: session.id }
	}, delay)
	await SessionsUseCases.updateTaskIdsAndTimes({
		sessionId: session.id,
		data: { delayInMs: delay, taskIds: [taskId] }
	})
}

export const endSession = async (sessionId: string) => await SessionsUseCases.markDone(sessionId)

export const cancelSessionTask = async (session: SessionEntity) => await Promise.all(session.taskIds.map(appInstance.job.removeDelayedJob))