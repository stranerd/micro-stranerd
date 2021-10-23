import { ChangeStreamCallbacks } from '@utils/commons'
import { getSocketEmitter } from '@index'
import {
	PastQuestionObjEntity,
	PastQuestionObjFromModel,
	PastQuestionTheoryEntity,
	PastQuestionTheoryFromModel
} from '@modules/resources'

export const PastQuestionTheoryChangeStreamCallbacks: ChangeStreamCallbacks<PastQuestionTheoryFromModel, PastQuestionTheoryEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('pastTheoryQuestions', after)
		await getSocketEmitter().emitOpenCreated(`pastTheoryQuestions/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('pastTheoryQuestions', after)
		await getSocketEmitter().emitOpenUpdated(`pastTheoryQuestions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('pastTheoryQuestions', before)
		await getSocketEmitter().emitOpenDeleted(`pastTheoryQuestions/${before.id}`, before)
	}
}

export const PastQuestionObjChangeStreamCallbacks: ChangeStreamCallbacks<PastQuestionObjFromModel, PastQuestionObjEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('pastObjQuestions', after)
		await getSocketEmitter().emitOpenCreated(`pastObjQuestions/${after.id}`, after)
	},
	updated: async ({ after }) => {
		await getSocketEmitter().emitOpenUpdated('pastObjQuestions', after)
		await getSocketEmitter().emitOpenUpdated(`pastObjQuestions/${after.id}`, after)
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('pastObjQuestions', before)
		await getSocketEmitter().emitOpenDeleted(`pastObjQuestions/${before.id}`, before)
	}
}