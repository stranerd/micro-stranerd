import { Email } from '../emails'

export enum EventTypes {
	TEST = 'TEST',
	SENDMAIL = 'SENDMAIL'
}

interface Event<Data> {
	topic: keyof typeof EventTypes;
	data: Data;
}

export interface Events extends Record<EventTypes, Event<any>> {
	[EventTypes.TEST]: {
		topic: typeof EventTypes.TEST,
		data: string
	},
	[EventTypes.SENDMAIL]: {
		topic: typeof EventTypes.SENDMAIL,
		data: Email
	}
}