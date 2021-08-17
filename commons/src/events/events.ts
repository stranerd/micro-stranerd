import { Events, EventTypes } from './eventTypes'
import { getRabbitConnection , RabbitMQConfig } from './rabbit'

export class EventBus {
	register = 'StranerdExchangeColumn'

	constructor (public config: RabbitMQConfig) {}

	createPublisher<Event extends Events[EventTypes]> (topic: Event['topic']) {
		const { register, config } = this

		async function publish (data: Event['data']) {
			const conn = await getRabbitConnection(register, config)
			await conn.publish(topic as unknown as string, JSON.stringify(data))
		}

		return { publish }
	}

	createSubscriber<Event extends Events[EventTypes]> (key: string, topic: Event['topic'], onMessage: (data: Event['data']) => void) {
		const { register, config } = this

		async function subscribe () {
			const conn = await getRabbitConnection(register, config)
			await conn.subscribe(key, topic as unknown as string, (data) => {
				onMessage(JSON.parse(data))
			})
		}

		return { subscribe }
	}
}