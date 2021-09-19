import { Emails, getEnvOrFail } from '@utils/commons'

const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'development'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')

const mails = JSON.parse(getEnvOrFail('EMAILS') || '{}')
export const emails = Object.fromEntries(
	Object.entries(Emails).map(([key, value]) => [value, {
		privateKey: mails[key.toLowerCase()].private_key,
		clientId: mails[key.toLowerCase()].client_id
	}])
)