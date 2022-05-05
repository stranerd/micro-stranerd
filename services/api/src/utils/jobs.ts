import { appInstance, CronTypes, EventTypes } from '@utils/commons'
import { publishers } from '@utils/events'

export const startJobs = async () => {
	await appInstance.job.startProcessingQueues([
		{ name: CronTypes.hourly, cron: '0 * * * *' },
		{ name: CronTypes.daily, cron: '0 0 * * *' },
		{ name: CronTypes.weekly, cron: '0 0 * * SUN' },
		{ name: CronTypes.monthly, cron: '0 0 1 * *' }
	], {
		onDelayed: async (data) => {
			await publishers[EventTypes.TASKSDELAYED].publish(data)
		},
		onCron: async (type) => {
			await publishers[EventTypes.TASKSCRON].publish({ type })
		}
	})
}