// @ts-ignore
import { Email } from '../../commons'

export enum EmailsList {
	NO_REPLY = 'no-reply@stranerd.com'
}

export type TypedEmail = Email<EmailsList, {
	attachments?: {
		logoWhite?: boolean
		logoBlue?: boolean
		icon?: boolean
	}
}>