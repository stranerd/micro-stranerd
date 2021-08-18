import amqp  from 'amqplib'
import { rabbitMQConfig } from '../config'

export const getRabbitConnection = async (register: string) => {
	const connection = await amqp.connect(rabbitMQConfig)
	const channel = await connection.createChannel()

	await channel.assertExchange(register, 'direct', { durable: true })
	await channel.prefetch(1)

	const publish = async (topic: string, data: any) => {
		channel.publish(register, topic, Buffer.from(data), { persistent: true })
	}

	const subscribe = async (queueKey: string, topic: string, cb: (data: string, topic: string) => void) => {
		await channel.assertQueue(queueKey, { durable: true })
		await channel.bindQueue(queueKey, register, topic)
		channel.consume(queueKey, (msg) => {
			if (msg) {
				try {
					cb(msg.content.toString(), msg.fields.routingKey)
					channel.ack(msg)
				} catch (err) {
					// TODO: what to do if error b4 acknowledging
				}
			}
		}, {
			noAck: false
		}).then(() => {})
	}

	return { publish, subscribe }
}
