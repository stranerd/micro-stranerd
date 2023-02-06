import { EventEntity, EventsUseCases, EventType } from '@modules/classes'
import { appInstance } from '@utils/app/types'
import { CronLikeJobs, DelayedJobs } from '@utils/app/package'
import { addCron, getCronString } from '@utils/modules/classes'
import { sendNotification } from '@utils/modules/users/notifications'
import { NotificationType } from '@modules/users'

export const getCronOrder = (val: any) => {
	const { day = 0, hour = 0, minute = 0 } = val ?? {}
	return `${day.toString().padStart(2, '0')}${hour.toString().padStart(2, '0')}${minute.toString().padStart(2, '0')}`
}

export const scheduleEvent = async (event: EventEntity) => {
	const taskIds: string[] = []
	if (event.data.type === EventType.timetable) {
		const { start } = event.data
		await Promise.all([0, 15, 30].map(async (timeInMin) => {
			const id = await appInstance.job.addCronLikeJob({
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
				const id = await appInstance.job.addDelayedJob({
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
	if (event.data.type === EventType.timetable) await sendNotification(event.getAllUsers(), {
		title: `${timeInMin > 0 ? `In ${timeInMin} minutes` : 'Now'}`,
		sendEmail: false,
		body: event.title,
		data: { type: NotificationType.NewClassTimetableEvent, eventId: event.id, classId: event.classId, timeInMin }
	})
	else await sendNotification(event.getAllUsers(), {
		title: `${timeInMin > 0 ? `In ${timeInMin} minutes` : 'Now'}`,
		sendEmail: false,
		body: event.title,
		data: { type: NotificationType.NewClassOneOffEvent, eventId: event.id, classId: event.classId }
	})
}
