import { Events, EventTypes } from './eventTypes'
import { pubAndSub } from './rabbit'

export class EventBus {
	createPublisher<EventType extends EventTypes> (topic: EventType) {
		async function publish (data: Events[EventType]['data']) {
			const { publish } = await pubAndSub()
			await publish(topic as unknown as string, JSON.stringify(data))
		}

		return { publish }
	}

	createSubscriber<EventType extends EventTypes> (topic: EventType, onMessage: (data: Events[EventType]['data']) => void) {
		async function subscribe () {
			const { subscribe } = await pubAndSub()
			await subscribe(topic as unknown as string, (data) => {
				onMessage(JSON.parse(data))
			})
		}

		return { subscribe }
	}
}