import { EventEntity, EventsUseCases, EventType } from '@modules/classes'
import { appInstance, CronLikeEvent, CronLikeJobs, DelayedEvent, DelayedJobs } from '@utils/commons'

const TASK_ID_SEPARATOR = '---'

export const scheduleEvent = async (event: EventEntity) => {
	const taskIds: string[] = []
	if (event.data.type === EventType.repeatable) {
		const id = await appInstance.job.addCronLikeJob<CronLikeEvent>({
			type: CronLikeJobs.ClassEvent,
			data: { eventId: event.id }
		}, event.data.cron)
		taskIds.push(`${EventType.repeatable}${TASK_ID_SEPARATOR}${event.data.cron}${TASK_ID_SEPARATOR}${id}`)
	} else {
		const delay = event.data.scheduledAt - Date.now()
		const id = await appInstance.job.addDelayedJob<DelayedEvent>({
			type: DelayedJobs.ClassEvent,
			data: { eventId: event.id }
		}, delay)
		taskIds.push(`${EventType.oneOff}${TASK_ID_SEPARATOR}${id}`)
	}
	await EventsUseCases.updateTaskIds({
		id: event.id,
		data: { taskIds, add: true }
	})
}

export const unScheduleEvent = async (event: EventEntity) => {
	await Promise.all(event.taskIds.map(async (taskId) => {
		if (taskId.startsWith(EventType.repeatable)) {
			const [, cron = '', id = ''] = taskId.split(TASK_ID_SEPARATOR)
			await appInstance.job.removeCronLikeJob(id, cron)
		} else {
			const [, id = ''] = taskId.split(TASK_ID_SEPARATOR)
			await appInstance.job.removeDelayedJob(id)
		}
	}))
}
