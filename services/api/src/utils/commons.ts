// This file re-exports every export from the common npm module
// However, while developing, you might want to test out changes you make in the package,
// without having to publish the package, and update the package wherever you plan to use it.

// For standalone mode, everything is exported from the source code of the commons package, so you test your changes immediately
// For production or in docker, everything is exported from the latest version of the commons package published to npm-js

// When running in dev mode, uncomment this export && comment the other
// @ts-ignore
import { getEnvOrFail, Instance } from './common/package'
//@ts-ignore
export * from './common/package'

// For production, uncomment this export && comment the other
//@ts-ignore
// import { getEnvOrFail, Instance } from '@stranerd/api-commons'
//@ts-ignore
// export * from '@stranerd/api-commons'

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
export const appInstance = Instance.getInstance()

//@ts-ignore
export * from './common/types'
