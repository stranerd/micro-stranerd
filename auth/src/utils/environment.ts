import { getEnvOrFail } from '@utils/commons'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')

export const domain = getEnvOrFail('DOMAIN')
export const googleClientId = getEnvOrFail('GOOGLE_CLIENT_ID')