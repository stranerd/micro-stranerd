import { PhoneErrorEntity, PhoneErrorFromModel } from '@modules/feedback'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const PhoneErrorDbChangeCallbacks: DbChangeCallbacks<PhoneErrorFromModel, PhoneErrorEntity> = {
	created: async ({ after }) => {
		await appInstance.logger.error(after.error)
	}
}