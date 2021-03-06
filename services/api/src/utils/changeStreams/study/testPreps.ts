import { ChangeStreamCallbacks } from '@utils/commons'
import { SetSaved, SetsUseCases, TestPrepEntity, TestPrepFromModel, TestsUseCases } from '@modules/study'
import { getSocketEmitter } from '@index'

export const TestPrepChangeStreamCallbacks: ChangeStreamCallbacks<TestPrepFromModel, TestPrepEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitCreated('study/testPreps', after)
		await getSocketEmitter().emitCreated(`study/testPreps/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitUpdated('study/testPreps', after)
		await getSocketEmitter().emitUpdated(`study/testPreps/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitDeleted('study/testPreps', before)
		await getSocketEmitter().emitDeleted(`study/testPreps/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.testPreps, value: before.id })
		await TestsUseCases.deletePrepTests(before.id)
	}
}