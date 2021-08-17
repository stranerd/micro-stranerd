import { EventBus, EventTypes } from '../commons'
import { RabbitMQConfig } from './environment'

const eventBus = new EventBus(RabbitMQConfig)

export const subscribers = {
	[EventTypes.TEST]: eventBus.createSubscriber('test-subscriber', EventTypes.TEST, (data) => {
		console.log('Just received test event with value of', data)
	})
}

export const publishers = {
	[EventTypes.TEST]: eventBus.createPublisher(EventTypes.TEST)
}
