// @ts-ignore
import { CronTypes, Email, MediaOutput } from '../../commons'
import { PushNotification } from './types/push'

export enum EventTypes {
	SENDMAIL = 'SENDMAIL',
	SENDTEXT = 'SENDTEXT',
	DELETEFILE = 'DELETEFILE',
	PUSHNOTIFICATION = 'PUSHNOTIFICATION'
}

interface Event<Data> {
	topic: keyof typeof EventTypes;
	data: Data;
}

export interface Events extends Record<EventTypes, Event<any>> {
	SENDMAIL: {
		topic: typeof EventTypes.SENDMAIL,
		data: Email
	},
	DELETEFILE: {
		topic: typeof EventTypes.DELETEFILE,
		data: MediaOutput
	},
	PUSHNOTIFICATION: {
		topic: typeof EventTypes.PUSHNOTIFICATION,
		data: PushNotification
	}
}