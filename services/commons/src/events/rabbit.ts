import amqp from 'amqplib'
import { Instance } from '../instance'
import { addWaitBeforeExit } from '../exit'

export const pubAndSub = async () => {
	const column = Instance.getInstance().settings.rabbitColumnName
	const con = await amqp.connect(Instance.getInstance().settings.rabbitURI)

	const channel = await con.createChannel()

	addWaitBeforeExit(channel.close)

	await channel.assertExchange(column, 'direct', { durable: true })
	await channel.prefetch(1)

	const publish = async (topic: string, data: any) => {
		channel.publish(column, topic, Buffer.from(data), { persistent: true })
	}

	const subscribe = async (topic: string, cb: (data: string, topic: string) => void) => {
		const queue = `${Instance.getInstance().settings.appId}-${topic}`
		await channel.assertQueue(queue, { durable: true })
		await channel.bindQueue(queue, column, topic)
		channel.consume(queue, (msg) => {
			if (msg) {
				try {
					cb(msg.content.toString(), msg.fields.routingKey)
					channel.ack(msg)
				} catch (err) {
					channel.nack(msg)
				}
			}
		}, {
			noAck: false
		}).then()
	}

	return { publish, subscribe }
}
