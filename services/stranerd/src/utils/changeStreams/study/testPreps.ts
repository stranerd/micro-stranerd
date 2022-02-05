import { ChangeStreamCallbacks } from '@utils/commons'
import { RemoveSetProp, SetSaved, TestPrepEntity, TestPrepFromModel } from '@modules/study'
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

		await RemoveSetProp.execute({ prop: SetSaved.testPreps, value: before.id })
	}
}