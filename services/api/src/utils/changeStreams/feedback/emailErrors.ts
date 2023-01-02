import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { EmailErrorEntity, EmailErrorFromModel } from '@modules/feedback'

export const EmailErrorChangeStreamCallbacks: ChangeStreamCallbacks<EmailErrorFromModel, EmailErrorEntity> = {
	created: async ({ after }) => {
		await appInstance.logger.error(after.error)
	}
}