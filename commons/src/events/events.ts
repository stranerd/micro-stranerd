import { Events, EventTypes } from './eventTypes'
import { pubAndSub } from './rabbit'

export class EventBus {
	ps = pubAndSub()

	createPublisher<EventType extends EventTypes> (topic: EventType) {
		const { ps } = this

		async function publish (data: Events[EventType]['data']) {
			await (await ps).publish(topic as unknown as string, JSON.stringify(data))
		}

		return { publish }
	}

	createSubscriber<EventType extends EventTypes> (topic: EventType, onMessage: (data: Events[EventType]['data']) => void) {
		const { ps } = this

		async function subscribe () {
			await (await ps).subscribe(topic as unknown as string, (data) => {
				onMessage(JSON.parse(data))
			})
		}

		return { subscribe }
	}
}