import dotenv from 'dotenv'
import { Logger } from './logger'

dotenv.config()

export const getEnvOrFail = (key: string, skipFail = false) => {
	const value = process.env[key]
	if (value) return value
	if (!skipFail) Logger
		.error(`Environment variable not found: ${key}`)
		.then(() => process.exit(1))
	return ''
}

const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'local'

export const accessTokenKey = getEnvOrFail('ACCESS_TOKEN_KEY')
export const refreshTokenKey = getEnvOrFail('REFRESH_TOKEN_KEY')

export const mongoDbURI = getEnvOrFail('MONGODB_URI', true)

export const rabbitURI = getEnvOrFail('RABBITMQ_URI', true)

export const redisURI = getEnvOrFail('REDIS_URI', true)

export const appId = getEnvOrFail('APP_ID', true) || 'appId'
