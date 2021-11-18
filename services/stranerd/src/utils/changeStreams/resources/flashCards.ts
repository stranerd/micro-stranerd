import { ChangeStreamCallbacks } from '@utils/commons'
import { FlashCardEntity, FlashCardFromModel, RemoveSetProp } from '@modules/resources'
import { getSocketEmitter } from '@index'

export const FlashCardChangeStreamCallbacks: ChangeStreamCallbacks<FlashCardFromModel, FlashCardEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('flashCards', after)
		await getSocketEmitter().emitOpenCreated(`flashCards/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('flashCards', after)
		await getSocketEmitter().emitOpenUpdated(`flashCards/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('flashCards', before)
		await getSocketEmitter().emitOpenDeleted(`flashCards/${before.id}`, before)

		await RemoveSetProp.execute({ prop: 'flashCards', value: before.id })
	}
}