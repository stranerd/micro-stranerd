import { ChangeStreamCallbacks } from '@utils/commons'
import { DeletePrepTests, RemoveSetProp, SetSaved, TestPrepEntity, TestPrepFromModel } from '@modules/study'
import { getSocketEmitter } from '@index'

export const TestPrepChangeStreamCallbacks: ChangeStreamCallbacks<TestPrepFromModel, TestPrepEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('study/testPreps', after)
		await getSocketEmitter().emitOpenCreated(`study/testPreps/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('study/testPreps', after)
		await getSocketEmitter().emitOpenUpdated(`study/testPreps/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('study/testPreps', before)
		await getSocketEmitter().emitOpenDeleted(`study/testPreps/${before.id}`, before)

		await RemoveSetProp.execute({ prop: SetSaved.testPreps, value: before.id })
		await DeletePrepTests.execute(before.id)
	}
}