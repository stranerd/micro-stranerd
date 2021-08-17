import { Event } from './eventTypes'
import { getRabbitConnection , RabbitMQConfig } from './rabbit'

export class EventBus {
	register = 'StranerdExchangeColumn'

	constructor (public config: RabbitMQConfig) {}

	createPublisher<T extends Event<any>> (topic: T['topic']) {
		const { register, config } = this

		async function publish (data: T['data']) {
			const conn = await getRabbitConnection(register, config)
			await conn.publish(topic as unknown as string, JSON.stringify(data))
		}

		return { publish }
	}

	createSubscriber<T extends Event<any>> (key: string, topic: T['topic'], onMessage: (data: T['data']) => void) {
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