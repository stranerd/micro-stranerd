import { Events, EventTypes } from './eventTypes'
import { getRabbitConnection } from './rabbit'

export class EventBus {
	register = 'StranerdExchangeColumn'
	conn = getRabbitConnection(this.register)

	createPublisher<EventType extends EventTypes> (topic: EventType) {
		const { conn } = this

		async function publish (data: Events[EventType]['data']) {
			await (await conn).publish(topic as unknown as string, JSON.stringify(data))
		}

		return { publish }
	}

	createSubscriber<EventType extends EventTypes> (topic: EventType, onMessage: (data: Events[EventType]['data']) => void) {
		const { conn } = this

		async function subscribe () {
			await (await conn).subscribe(topic as unknown as string, (data) => {
				onMessage(JSON.parse(data))
			})
		}

		return { subscribe }
	}
}