import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatFromModel } from '@modules/sessions/data/models/chat'
import { ChatEntity } from '@modules/sessions'

export const ChatChangeStreamCallbacks: ChangeStreamCallbacks<ChatFromModel, ChatEntity> = {
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