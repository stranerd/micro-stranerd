import amqp  from 'amqplib'

export type RabbitMQConfig = {
	protocol: string,
	hostname: string,
	port: number,
	username: string,
	password: string,
	vHost?: string,
	authMechanism?: string[]
}

export const getRabbitConnection = async (register: string, config: RabbitMQConfig) => {
	const defaultConfig = {
		vHost: '/',
		authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
	}
	const allConfig = { ...defaultConfig, ...config }
	const connection = await amqp.connect(allConfig)
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
