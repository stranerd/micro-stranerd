import { Email } from '../emails'
import { MediaOutput } from '../storage'
import { AuthUserChange } from './types/auth'

export enum EventTypes {
	TEST = 'TEST',
	SENDMAIL = 'SENDMAIL',
	DELETEFILE = 'DELETEFILE',
	AUTHUSERCREATED = 'AUTHUSERCREATED',
	AUTHUSERUPDATED = 'AUTHUSERUPDATED'
}

interface Event<Data> {
	topic: keyof typeof EventTypes;
	data: Data;
}

export interface Events extends Record<EventTypes, Event<any>> {
	TEST: {
		topic: typeof EventTypes.TEST,
		data: string
	},
	SENDMAIL: {
		topic: typeof EventTypes.SENDMAIL,
		data: Email
	},
	DELETEFILE: {
		topic: typeof EventTypes.DELETEFILE,
		data: MediaOutput
	},
	AUTHUSERCREATED: {
		topic: typeof EventTypes.AUTHUSERCREATED,
		data: AuthUserChange
	},
	AUTHUSERUPDATED: {
		topic: typeof EventTypes.AUTHUSERUPDATED,
		data: AuthUserChange
	}
}