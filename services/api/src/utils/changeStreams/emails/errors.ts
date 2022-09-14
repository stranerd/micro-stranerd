import { ChangeStreamCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ErrorEntity, ErrorFromModel } from '@modules/emails'

export const ErrorChangeStreamCallbacks: ChangeStreamCallbacks<ErrorFromModel, ErrorEntity> = {
	created: async ({ after }) => {
		await appInstance.logger.error(after.error)
	}
}