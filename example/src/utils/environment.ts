const RABBITMQCONFIG = JSON.parse(process.env.RABBITMQCONFIG ?? '{}')
export const RabbitMQConfig = {
	protocol: RABBITMQCONFIG.protocol ?? 'amqp',
	hostname: RABBITMQCONFIG.hostname ?? 'localhost',
	port:     RABBITMQCONFIG.port ?? 5672,
	username: RABBITMQCONFIG.username ?? 'test',
	password: RABBITMQCONFIG.password ?? 'password',
	vHost: '/',
	authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
}

export const port = parseInt(process.env.PORT || '5000')
