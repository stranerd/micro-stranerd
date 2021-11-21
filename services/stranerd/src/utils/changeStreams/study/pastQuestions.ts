import { ChangeStreamCallbacks, EventTypes } from '@utils/commons'
import { getSocketEmitter } from '@index'
import { PastQuestionEntity, PastQuestionFromModel } from '@modules/study'
import { publishers } from '@utils/events'
import { PastQuestionType } from '@modules/study/domain/types'

export const PastQuestionChangeStreamCallbacks: ChangeStreamCallbacks<PastQuestionFromModel, PastQuestionEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('pastQuestions', after)
		await getSocketEmitter().emitOpenCreated(`pastQuestions/${after.id}`, after)
	},
	updated: async ({ after, before }) => {
		await getSocketEmitter().emitOpenUpdated('pastQuestions', after)
		await getSocketEmitter().emitOpenUpdated(`pastQuestions/${after.id}`, after)

		let oldMedia = [...before.questionMedia]
		if (before.data.type === PastQuestionType.theory) oldMedia = oldMedia.concat(before.data.answerMedia)
		else if (before.data.type === PastQuestionType.objective) oldMedia = oldMedia.concat(before.data.explanationMedia, before.data.optionsMedia.flat(1))

		let newMedia = [...after.questionMedia]
		if (after.data.type === PastQuestionType.theory) newMedia = oldMedia.concat(after.data.answerMedia)
		else if (after.data.type === PastQuestionType.objective) newMedia = oldMedia.concat(after.data.explanationMedia, after.data.optionsMedia.flat(1))

		const removed = oldMedia.filter((t) => !newMedia?.find((a) => a.path === t.path)) ?? []

		await Promise.all(removed.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment)))
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('pastQuestions', before)
		await getSocketEmitter().emitOpenDeleted(`pastQuestions/${before.id}`, before)

		let oldMedia = [...before.questionMedia]
		if (before.data.type === PastQuestionType.theory) oldMedia = oldMedia.concat(before.data.answerMedia)
		else if (before.data.type === PastQuestionType.objective) oldMedia = oldMedia.concat(before.data.explanationMedia, before.data.optionsMedia.flat(1))

		await Promise.all(oldMedia.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment)))
	}
}