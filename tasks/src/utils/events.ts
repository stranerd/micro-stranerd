import { EventBus, EventTypes, Logger } from '@utils/commons'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber(EventTypes.TEST, async (data) => {
		await Logger.success('Just received test event with value of', data)
	})
}

export const publishers = {
	[EventTypes.TASKSCRON]: eventBus.createPublisher(EventTypes.TASKSCRON),
	[EventTypes.TASKSDELAYED]: eventBus.createPublisher(EventTypes.TASKSDELAYED),
	[EventTypes.TEST]: eventBus.createPublisher(EventTypes.TEST)
}
