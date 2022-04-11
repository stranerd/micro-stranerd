import { appInstance, ChangeStreamCallbacks } from '@utils/commons'
import { ErrorEntity, ErrorFromModel } from '@modules/emails'

export const ErrorChangeStreamCallbacks: ChangeStreamCallbacks<ErrorFromModel, ErrorEntity> = {
	created: async ({ after }) => {
		await appInstance.logger.error(after.error)
	}
}