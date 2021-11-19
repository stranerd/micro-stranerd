import { ChangeStreamCallbacks } from '@utils/commons'
import { TestPrepEntity, TestPrepFromModel } from '@modules/resources'
import { getSocketEmitter } from '@index'

export const TestPrepChangeStreamCallbacks: ChangeStreamCallbacks<TestPrepFromModel, TestPrepEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('testPreps', after)
		await getSocketEmitter().emitOpenCreated(`testPreps/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('testPreps', after)
		await getSocketEmitter().emitOpenUpdated(`testPreps/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('testPreps', before)
		await getSocketEmitter().emitOpenDeleted(`testPreps/${before.id}`, before)
	}
}