import { Email } from '../emails'
import { MediaOutput } from '../storage'
import { AuthRoleChange, AuthUserChange, AuthUserDeleted } from './types/auth'
import { StranerdUserBioUpdated } from './types/stranerd/users'
import { CronTypes } from './types/tasks'

export enum EventTypes {
	TEST = 'TEST',
	SENDMAIL = 'SENDMAIL',
	DELETEFILE = 'DELETEFILE',
	AUTHUSERCREATED = 'AUTHUSERCREATED',
	AUTHUSERUPDATED = 'AUTHUSERUPDATED',
	AUTHROLESUPDATED = 'AUTHROLESUPDATED',
	AUTHUSERDELETED = 'AUTHUSERDELETED',
	STRANERDUSERBIOUPDATED = 'STRANERDUSERBIOUPDATED',
	TASKSCRON = 'TASKSCRON',
	TASKSDELAYED = 'TASKSDELAYED'
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
	},
	AUTHROLESUPDATED: {
		topic: typeof EventTypes.AUTHROLESUPDATED,
		data: AuthRoleChange
	},
	AUTHUSERDELETED: {
		topic: typeof EventTypes.AUTHUSERDELETED,
		data: AuthUserDeleted
	},
	STRANERDUSERBIOUPDATED: {
		topic: typeof EventTypes.STRANERDUSERBIOUPDATED,
		data: StranerdUserBioUpdated
	},
	TASKSCRON: {
		topic: typeof EventTypes.TASKSCRON,
		data: { type: CronTypes }
	},
	TASKSDELAYED: {
		topic: typeof EventTypes.TASKSDELAYED,
		data: { type: string, data: Record<string, any> }
	}
}