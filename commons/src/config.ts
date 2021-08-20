import dotenv from 'dotenv'
import { getNewLoggerInstance } from './logger'

dotenv.config()

export const getEnvOrFail = (key: string) => {
	const value = process.env[key]
	if (value) return value
	getNewLoggerInstance()
		.error(`Environment variable not found: ${ key }`)
		.then(() => process.exit(1))
	return ''
}

export const accessTokenKey = getEnvOrFail('ACCESS_TOKEN_KEY')
export const refreshTokenKey = getEnvOrFail('REFRESH_TOKEN_KEY')

export const mongoDbURI = getEnvOrFail('MONGODB_URI') ?? ''

const RABBITMQ_CONFIG = JSON.parse(getEnvOrFail('RABBITMQ_CONFIG') ?? '{}')
export const rabbitMQConfig = {
	protocol: RABBITMQ_CONFIG.protocol,
	hostname: RABBITMQ_CONFIG.hostname,
	port: RABBITMQ_CONFIG.port,
	username: RABBITMQ_CONFIG.username,
	password: RABBITMQ_CONFIG.password,
	vHost: RABBITMQ_CONFIG.vHost,
	authMechanism: RABBITMQ_CONFIG.authMechanism
}

export const redisURI = getEnvOrFail('REDIS_URI')

export const appId = getEnvOrFail('APP_ID')