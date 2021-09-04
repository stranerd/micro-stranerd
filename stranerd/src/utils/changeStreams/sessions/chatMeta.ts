import { ChangeStreamCallbacks } from '@utils/commons'
import { ChatMetaEntity } from '@modules/sessions'
import { ChatMetaFromModel } from '@modules/sessions/data/models/chatMeta'

export const ChatMetaChangeStreamCallbacks: ChangeStreamCallbacks<ChatMetaFromModel, ChatMetaEntity> = {
	created: async ({ after }) => {
		if (after) return
	},
	updated: async ({ after, changes }) => {
		if (after && changes) return
	},
	deleted: async ({ before }) => {
		if (before) return
	}
}