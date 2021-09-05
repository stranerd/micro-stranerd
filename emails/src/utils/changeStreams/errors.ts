import { ChangeStreamCallbacks, Logger } from '@utils/commons'
import { ErrorFromModel } from '@modules/data/models/errors'
import { ErrorEntity } from '@modules/domain/entities/errors'

export const ErrorChangeStreamCallbacks: ChangeStreamCallbacks<ErrorFromModel, ErrorEntity> = {
	created: async ({ after }) => {
		await Logger.error(after.error)
	}
}