import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { PhoneErrorEntity, PhoneErrorFromModel } from '@modules/feedback'

export const PhoneErrorChangeStreamCallbacks: ChangeStreamCallbacks<PhoneErrorFromModel, PhoneErrorEntity> = {
	created: async ({ after }) => {
		await appInstance.logger.error(after.error)
	}
}