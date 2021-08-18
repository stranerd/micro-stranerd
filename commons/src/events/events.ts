import { Events, EventTypes } from './eventTypes'
import { getRabbitConnection } from './rabbit'

export class EventBus {
	register = 'StranerdExchangeColumn'

	createPublisher<Event extends Events[EventTypes]> (topic: Event['topic']) {
		const { register } = this

		async function publish (data: Event['data']) {
			const conn = await getRabbitConnection(register)
			await conn.publish(topic as unknown as string, JSON.stringify(data))
		}

		return { publish }
	}

	createSubscriber<Event extends Events[EventTypes]> (key: string, topic: Event['topic'], onMessage: (data: Event['data']) => void) {
		const { register } = this

		async function subscribe () {
			const conn = await getRabbitConnection(register)
			await conn.subscribe(key, topic as unknown as string, (data) => {
				onMessage(JSON.parse(data))
			})
		}

		return { subscribe }
	}
}