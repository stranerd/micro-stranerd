import { pubAndSub } from './rabbit'

export class EventBus {
	ps: ReturnType<typeof pubAndSub>

	constructor () {
		this.ps = pubAndSub()
	}

	createPublisher<Event extends { topic: string, data: any }> (topic: Event['topic']) {
		const { ps } = this

		async function publish (data: Event['data']) {
			await (await ps).publish(topic as unknown as string, JSON.stringify(data))
		}

		return { publish }
	}

	createSubscriber<Event extends { topic: string, data: any }> (topic: Event['topic'], onMessage: (data: Event['data']) => void) {
		const { ps } = this

		async function subscribe () {
			await (await ps).subscribe(topic as unknown as string, (data) => {
				onMessage(JSON.parse(data))
			})
		}

		return { subscribe }
	}
}