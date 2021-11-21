import { ChangeStreamCallbacks } from '@utils/commons'
import { TestEntity, TestFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'

export const TestChangeStreamCallbacks: ChangeStreamCallbacks<TestFromModel, TestEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('tests', after)
		await getSocketEmitter().emitOpenCreated(`tests/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('tests', after)
		await getSocketEmitter().emitOpenUpdated(`tests/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('tests', before)
		await getSocketEmitter().emitOpenDeleted(`tests/${before.id}`, before)
	}
}