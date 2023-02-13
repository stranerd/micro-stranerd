import { SetSaved, SetsUseCases, TestPrepEntity, TestPrepFromModel, TestsUseCases } from '@modules/study'
import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const TestPrepChangeStreamCallbacks: ChangeStreamCallbacks<TestPrepFromModel, TestPrepEntity> = {
	created: async ({ after }) => {
		await appInstance.socketEmitter.emitCreated('study/testPreps', after)
		await appInstance.socketEmitter.emitCreated(`study/testPreps/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.socketEmitter.emitUpdated('study/testPreps', after)
		await appInstance.socketEmitter.emitUpdated(`study/testPreps/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.socketEmitter.emitDeleted('study/testPreps', before)
		await appInstance.socketEmitter.emitDeleted(`study/testPreps/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.testPreps, value: before.id })
		await TestsUseCases.deletePrepTests(before.id)
	}
}