import { EmailsList, getEnvOrFail } from '@utils/commons'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')
export const environment = getEnvOrFail('ENVIRONMENT')
export const isDev = environment === 'local'

const mails = JSON.parse(getEnvOrFail('EMAILS') || '{}')
export const emails = Object.fromEntries(
	Object.entries(EmailsList).map(([key, value]) => [value, {
		privateKey: mails[key.toLowerCase()].private_key,
		clientId: mails[key.toLowerCase()].client_id
	}])
)
