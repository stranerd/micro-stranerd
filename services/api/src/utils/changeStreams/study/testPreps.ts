import { SetSaved, SetsUseCases, TestPrepEntity, TestPrepFromModel, TestsUseCases } from '@modules/study'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const TestPrepDbChangeCallbacks: DbChangeCallbacks<TestPrepFromModel, TestPrepEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('study/testPreps', after)
		await appInstance.listener.created(`study/testPreps/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await appInstance.listener.updated('study/testPreps', after)
		await appInstance.listener.updated(`study/testPreps/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('study/testPreps', before)
		await appInstance.listener.deleted(`study/testPreps/${before.id}`, before)

		await SetsUseCases.removeProp({ prop: SetSaved.testPreps, value: before.id })
		await TestsUseCases.deletePrepTests(before.id)
	}
}