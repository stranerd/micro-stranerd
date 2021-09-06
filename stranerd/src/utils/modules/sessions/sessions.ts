import { SessionEntity } from '@modules/sessions/domain/entities/session'
import { addDelayedJob, DelayedJobs, removeDelayedJob } from '@utils/commons'
import { MarkSessionDone, UpdateTaskIdAndStartedAt } from '@modules/sessions'

export const startSession = async (session: SessionEntity) => {
	if (session.taskId && session.startedAt) return

	const delay = session.duration * 60 * 1000
	const taskId = await addDelayedJob({
		type: DelayedJobs.SessionTimer,
		data: { sessionId: session.id }
	}, delay)
	await UpdateTaskIdAndStartedAt.execute({
		sessionId: session.id,
		data: { taskId, startedAt: Date.now() }
	})
}

/* export const extendSessionTime = async (session: SessionEntity, extensionInMinutes: number) => {
	if (!session.taskId || !session.startedAt) return

	// TODO: Get time left for session
	const minutesLeft = 0
	const delay = (minutesLeft + extensionInMinutes) * 60 * 1000

	if (session.taskId) await removeDelayedJob(session.taskId)

	const taskId = await addDelayedJob({
		type: DelayedJobs.SessionTimer,
		data: { sessionId: session.id }
	}, delay)
	await UpdateTaskIdAndStartedAt.execute({
		sessionId: session.id,
		data: { taskId }
	})
} */

export const endSession = async (sessionId: string) => {
	await MarkSessionDone.execute(sessionId)
}

export const cancelSessionTask = async (session: SessionEntity) => {
	if (!session.taskId) return
	await removeDelayedJob(session.taskId)
}