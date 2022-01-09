import dotenv from 'dotenv'
import { Logger } from './logger'

dotenv.config()

export const getEnvOrFail = (key: string) => {
	const value = process.env[key]
	if (value) return value
	Logger
		.error(`Environment variable not found: ${key}`)
		.then(() => process.exit(1))
	return ''
}

export const accessTokenKey = getEnvOrFail('ACCESS_TOKEN_KEY')
export const refreshTokenKey = getEnvOrFail('REFRESH_TOKEN_KEY')

export const mongoDbURI = getEnvOrFail('MONGODB_URI') ?? ''

export const rabbitURI = getEnvOrFail('RABBITMQ_URI') || ''

export const redisURI = getEnvOrFail('REDIS_URI')

export const appId = getEnvOrFail('APP_ID')
