import { CronTypes, EventBus, EventTypes, Logger, retryAllFailedJobs } from '@utils/commons'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber(EventTypes.TEST, async (data) => {
		await Logger.success('Just received test event with value of', data)
	}),
	[EventTypes.TASKSCRON]: eventBus.createSubscriber(EventTypes.TASKSCRON, async (data) => {
		if (data.type === CronTypes.halfHourly) await retryAllFailedJobs()
	})
}

export const publishers = {
	[EventTypes.TASKSCRON]: eventBus.createPublisher(EventTypes.TASKSCRON),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher(EventTypes.TASKSDELAYED),
	[EventTypes.TEST]: eventBus.createPublisher(EventTypes.TEST)
}
