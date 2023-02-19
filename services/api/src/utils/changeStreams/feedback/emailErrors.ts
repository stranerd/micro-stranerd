import { EmailErrorEntity, EmailErrorFromModel } from '@modules/feedback'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'

export const EmailErrorDbChangeCallbacks: DbChangeCallbacks<EmailErrorFromModel, EmailErrorEntity> = {
	created: async ({ after }) => {
		await appInstance.logger.error(after.error)
	}
}