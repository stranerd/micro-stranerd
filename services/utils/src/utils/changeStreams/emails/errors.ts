import { ChangeStreamCallbacks, Logger } from '@utils/commons'
import { ErrorEntity, ErrorFromModel } from '@modules/emails'

export const ErrorChangeStreamCallbacks: ChangeStreamCallbacks<ErrorFromModel, ErrorEntity> = {
	created: async ({ after }) => {
		await Logger.error(after.error)
	}
}