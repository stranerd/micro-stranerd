import { Events, EventTypes } from './eventTypes'
import { getRabbitConnection } from './rabbit'

export class EventBus {
	register = 'StranerdExchangeColumn'

	createPublisher<EventType extends EventTypes> (topic: EventType) {
		const { register } = this

		async function publish (data: Events[EventType]['data']) {
			const conn = await getRabbitConnection(register)
			await conn.publish(topic as unknown as string, JSON.stringify(data))
		}

		return { publish }
	}

	createSubscriber<EventType extends EventTypes> (topic: EventType, onMessage: (data: Events[EventType]['data']) => void) {
		const { register } = this

		async function subscribe () {
			const conn = await getRabbitConnection(register)
			await conn.subscribe(topic as unknown as string, (data) => {
				onMessage(JSON.parse(data))
			})
		}

		return { subscribe }
	}
}