import { EventBus, EventTypes } from '@utils/commons'
import { logger } from '@utils/logger'

const eventBus = new EventBus()

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber(EventTypes.TEST, async (data) => {
		await logger.success('Just received test event with value of', data)
	})
}

export const publishers = {
	[EventTypes.TEST]: eventBus.createPublisher(EventTypes.TEST)
}
