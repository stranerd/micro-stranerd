import { EventEntity, EventsUseCases, EventType } from '@modules/classes'
import { appInstance, CronLikeEvent, CronLikeJobs, DelayedEvent, DelayedJobs } from '@utils/commons'
import { addCron, getCronString } from '@utils/modules/classes'
import { sendNotification } from '@utils/modules/users/notifications'

export const scheduleEvent = async (event: EventEntity) => {
	const taskIds: string[] = []
	if (event.data.type === EventType.timetable) {
		const { start } = event.data
		await Promise.all([0, 15, 30].map(async (timeInMin) => {
			const id = await appInstance.job.addCronLikeJob<CronLikeEvent>({
				type: CronLikeJobs.ClassEvent,
				data: { eventId: event.id, timeInMin }
			}, getCronString(addCron(start, 0 - timeInMin)), start.tz)
			taskIds.push(id)
		}))
	} else {
		const delay = event.data.scheduledAt - Date.now()
		await Promise.all([0, 5, 30]
			.filter((timeInMin) => delay - (timeInMin * 60 * 1000) >= 0)
			.map(async (timeInMin) => {
				const id = await appInstance.job.addDelayedJob<DelayedEvent>({
					type: DelayedJobs.ClassEvent,
					data: { eventId: event.id, timeInMin }
				}, delay - (timeInMin * 60 * 1000))
				taskIds.push(id)
			}))
	}
	await EventsUseCases.updateTaskIds({
		id: event.id,
		data: { taskIds, add: true }
	})
}

export const unScheduleEvent = async (event: EventEntity) => {
	await Promise.all(event.taskIds.map(async (taskId) => {
		if (event.data.type === EventType.timetable) await appInstance.job.removeCronLikeJob(taskId)
		else await appInstance.job.removeDelayedJob(taskId)
	}))
}

export const broadcastEvent = async (eventId: string, timeInMin: number) => {
	const { results: [event] } = await EventsUseCases.get({ where: [{ field: 'id', value: eventId }] })
	if (!event) return
	let body = ''
	if (event.data.type === EventType.timetable) body = timeInMin > 0 ? `Reminder: ${event.title} will start in ${timeInMin} minutes` : `Reminder: ${event.title} is starting now`
	else body = timeInMin > 0 ? `Reminder: ${event.title} ends in ${timeInMin} minutes` : `Reminder: ${event.title} is ending now`
	await sendNotification(event.getAllUsers(), {
		title: 'Class Event', body, action: 'classEvents', sendEmail: false,
		data: { eventId: event.id, classId: event.classId }
	})
}
