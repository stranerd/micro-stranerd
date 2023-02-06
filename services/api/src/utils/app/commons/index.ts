import dotenv from 'dotenv'

dotenv.config()

export * from './emails'
export * from './enums'
export { Enum } from './enums/types'
export { Events } from './events/events'
export * from './errors'
export * from './exit'
export * from './express'
export * from './instance'
export * from './mongoose'
export * from './sockets'
export * from './storage'
export * from './structure'
export * from './utils/auth'
export * from './utils/authUser'
export * from './utils/tokens'
export * from './utils/utils'
export * from './validations'

export const getEnvOrFail = (key: string) => {
	const value = process.env[key]
	if (value) return value
	// eslint-disable-next-line no-console
	console.error(`Environment variable not found: ${key}`)
	process.exit(1)
}