import { getNewLoggerInstance } from './logger'

export const getEnvOrFail = (key: string) => {
	const value = process.env[key]
	if (value) return value
	getNewLoggerInstance()
		.error(`Environment variable not found: ${key}`)
		.then(() => process.exit(1))
}

export const accessTokenKey = getEnvOrFail('ACCESS_TOKEN_KEY') ?? ''
export const refreshTokenKey = getEnvOrFail('REFRESH_TOKEN_KEY') ?? ''