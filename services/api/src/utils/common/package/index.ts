import dotenv from 'dotenv'

dotenv.config()

export * from './bull/types'
export * from './emails'
export * from './errors'
export * from './express'
export * from './instance'
export * from './storage'
export * from './structure'
export * from './mongoose'
export * from './utils/tokens'
export * from './utils/authUser'
export * from './utils/utils'
export * from './validations'
export * from './sockets'

export const getEnvOrFail = (key: string) => {
	const value = process.env[key]
	if (value) return value
	// eslint-disable-next-line no-console
	console.error(`Environment variable not found: ${key}`)
	process.exit(1)
	return ''
}