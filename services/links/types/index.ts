export * from './push'

// @ts-ignore
import { getEnvOrFail, Instance } from '../package'
import './enums'


Instance.initialize({
	isDev: getEnvOrFail('ENVIRONMENT') === 'local',
	accessTokenKey: getEnvOrFail('ACCESS_TOKEN_KEY'),
	refreshTokenKey: getEnvOrFail('REFRESH_TOKEN_KEY'),
	mongoDbURI: getEnvOrFail('MONGODB_URI'),
	rabbitURI: getEnvOrFail('RABBITMQ_URI'),
	redisURI: getEnvOrFail('REDIS_URI'),
	appId: getEnvOrFail('APP_ID'),
	bullQueueName: 'task-queues',
	rabbitColumnName: 'StranerdExchangeColumn'
})
export const appInstance = Instance.get()