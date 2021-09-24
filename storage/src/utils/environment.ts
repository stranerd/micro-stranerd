import { getEnvOrFail } from '@utils/commons'

export const port = parseInt(getEnvOrFail('PORT'))
export const appId = getEnvOrFail('APP_ID')
export const environment = getEnvOrFail('ENVIRONMENT')

export const isDev = environment === 'local'