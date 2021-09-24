import amqp from 'amqplib'
import { appId, rabbitURI } from '../config'

let connection = null as amqp.Connection | null

export const getRabbitConnection = async (register: string) => {
	if (!connection) connection = await amqp.connect(rabbitURI)
	const channel = await connection.createChannel()

	process.on('exit', () => channel.close())

	await channel.assertExchange(register, 'direct', { durable: true })
	await channel.prefetch(1)

	const publish = async (topic: string, data: any) => {
		channel.publish(register, topic, Buffer.from(data), { persistent: true })
	}

	const subscribe = async (topic: string, cb: (data: string, topic: string) => void) => {
		const queue = `${appId}-${topic}`
		await channel.assertQueue(queue, { durable: true })
		await channel.bindQueue(queue, register, topic)
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
