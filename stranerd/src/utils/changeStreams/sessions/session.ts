import { ChangeStreamCallbacks } from '@utils/commons'
import { SessionEntity } from '@modules/sessions'
import { SessionFromModel } from '@modules/sessions/data/models/session'

export const SessionChangeStreamCallbacks: ChangeStreamCallbacks<SessionFromModel, SessionEntity> = {
	created: async ({ after }) => {
	    if(after) return
	},
	updated: async ({ after, changes }) => {
		if(after && changes) return
	},
	deleted: async ({ before }) => {
		if(before) return
	}
}