import { Event } from './eventTypes'

export abstract class Publisher<T extends Event<any>> {
	abstract type: T['type']

	async publish(data: T['data']) {
		return new Promise((resolve: () => void, reject: (err: Error) => void) => {
			try {
				// Logic to publish event
				console.log(this.type)
				console.log(JSON.stringify(data))
				resolve()
			} catch (err) { reject(err) }
		})
	}
}

export abstract class Subscriber<T extends Event<any>> {
	abstract type: T['type']
	abstract onMessage: (data: T['data']) => void

	async listen() {
		console.log('Listening')
		console.log(this.type)
		console.log(this.onMessage)
		/* subscription.on('message', (msg: Message) => {
			onMessage(JSON.parse(message))
		}) */
	}
}
