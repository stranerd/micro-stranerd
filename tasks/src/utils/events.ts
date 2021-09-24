import { CronTypes, EventBus, EventTypes, retryAllFailedJobs } from '@utils/commons'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TASKSCRON]: eventBus.createSubscriber(EventTypes.TASKSCRON, async (data) => {
		if (data.type === CronTypes.halfHourly) await retryAllFailedJobs()
	})
}

export const publishers = {
	[EventTypes.TASKSCRON]: eventBus.createPublisher(EventTypes.TASKSCRON),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher(EventTypes.TASKSDELAYED),
	[EventTypes.TEST]: eventBus.createPublisher(EventTypes.TEST)
}
