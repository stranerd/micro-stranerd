import { PastQuestionEntity, PastQuestionFromModel, PastQuestionType } from '@modules/school'
import { DbChangeCallbacks } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { publishers } from '@utils/events'

export const PastQuestionDbChangeCallbacks: DbChangeCallbacks<PastQuestionFromModel, PastQuestionEntity> = {
	created: async ({ after }) => {
		await appInstance.listener.created('school/pastQuestions', after)
		await appInstance.listener.created(`school/pastQuestions/${after.id}`, after)
	},
	updated: async ({ after, before }) => {
		await appInstance.listener.updated('school/pastQuestions', after)
		await appInstance.listener.updated(`school/pastQuestions/${after.id}`, after)

		let oldMedia = [...before.questionMedia]
		if (before.data.type === PastQuestionType.objective) oldMedia = oldMedia.concat(before.data.explanationMedia, before.data.optionsMedia.flat(1))
		else oldMedia = oldMedia.concat(before.data.answerMedia)

		let newMedia = [...after.questionMedia]
		if (after.data.type === PastQuestionType.objective) newMedia = oldMedia.concat(after.data.explanationMedia, after.data.optionsMedia.flat(1))
		else newMedia = oldMedia.concat(after.data.answerMedia)

		const removed = oldMedia.filter((t) => t && !newMedia?.find((a) => a?.path === t.path))

		await Promise.all(removed.map(async (attachment) => await publishers.DELETEFILE.publish(attachment)))
	},
	deleted: async ({ before }) => {
		await appInstance.listener.deleted('school/pastQuestions', before)
		await appInstance.listener.deleted(`school/pastQuestions/${before.id}`, before)

		let oldMedia = [...before.questionMedia]
		if (before.data.type === PastQuestionType.objective) oldMedia = oldMedia.concat(before.data.explanationMedia, before.data.optionsMedia.flat(1))
		else oldMedia = oldMedia.concat(before.data.answerMedia)

		await Promise.all(oldMedia.filter((t) => t)
			.map(async (attachment) => await publishers.DELETEFILE.publish(attachment)))
	}
}