import { Email } from '../emails'
import { MediaOutput } from '../storage'
import { AuthRoleChange, AuthUserChange, AuthUserDeleted } from './types/auth'
import { CronTypes, DelayedEvent } from '../bull/types'

export enum EventTypes {
	SENDMAIL = 'SENDMAIL',
	DELETEFILE = 'DELETEFILE',
	AUTHNEWREFERRAL = 'AUTHNEWREFERRAL',
	AUTHUSERCREATED = 'AUTHUSERCREATED',
	AUTHUSERUPDATED = 'AUTHUSERUPDATED',
	AUTHROLESUPDATED = 'AUTHROLESUPDATED',
	AUTHUSERDELETED = 'AUTHUSERDELETED',
	TASKSCRON = 'TASKSCRON',
	TASKSDELAYED = 'TASKSDELAYED'
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
	AUTHNEWREFERRAL: {
		topic: typeof EventTypes.AUTHNEWREFERRAL,
		data: { referrer: string, referred: string }
	},
	AUTHUSERCREATED: {
		topic: typeof EventTypes.AUTHUSERCREATED,
		data: AuthUserChange
	},
	AUTHUSERUPDATED: {
		topic: typeof EventTypes.AUTHUSERUPDATED,
		data: AuthUserChange
	},
	AUTHROLESUPDATED: {
		topic: typeof EventTypes.AUTHROLESUPDATED,
		data: AuthRoleChange
	},
	AUTHUSERDELETED: {
		topic: typeof EventTypes.AUTHUSERDELETED,
		data: AuthUserDeleted
	},
	TASKSCRON: {
		topic: typeof EventTypes.TASKSCRON,
		data: { type: CronTypes }
	},
	TASKSDELAYED: {
		topic: typeof EventTypes.TASKSDELAYED,
		data: DelayedEvent
	}
}