import { ChangeStreamCallbacks, EventTypes, MediaOutput } from '@utils/commons'
import { getSocketEmitter } from '@index'
import {
	PastQuestionObjEntity,
	PastQuestionObjFromModel,
	PastQuestionTheoryEntity,
	PastQuestionTheoryFromModel
} from '@modules/resources'
import { publishers } from '@utils/events'

export const PastQuestionTheoryChangeStreamCallbacks: ChangeStreamCallbacks<PastQuestionTheoryFromModel, PastQuestionTheoryEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('pastTheoryQuestions', after)
		await getSocketEmitter().emitOpenCreated(`pastTheoryQuestions/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitOpenUpdated('pastTheoryQuestions', after)
		await getSocketEmitter().emitOpenUpdated(`pastTheoryQuestions/${after.id}`, after)

		const keys = ['questionMedia', 'answerMedia']
		const media = keys.map((key) => {
			if (changes[key]) return before[key]?.filter((t: MediaOutput) => !after[key]?.find((a) => a.path === t.path)) ?? []
			return []
		}).flat(1)
		await Promise.all(media.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment)))
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('pastTheoryQuestions', before)
		await getSocketEmitter().emitOpenDeleted(`pastTheoryQuestions/${before.id}`, before)

		const keys = ['questionMedia', 'answerMedia']
		const media = keys.map((key) => before[key] ?? []).flat(1)
		await Promise.all(media.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment)))
	}
}

export const PastQuestionObjChangeStreamCallbacks: ChangeStreamCallbacks<PastQuestionObjFromModel, PastQuestionObjEntity> = {
	created: async ({ after }) => {
		await getSocketEmitter().emitOpenCreated('pastObjQuestions', after)
		await getSocketEmitter().emitOpenCreated(`pastObjQuestions/${after.id}`, after)
	},
	updated: async ({ after, before, changes }) => {
		await getSocketEmitter().emitOpenUpdated('pastObjQuestions', after)
		await getSocketEmitter().emitOpenUpdated(`pastObjQuestions/${after.id}`, after)

		const keys = ['questionMedia', 'aMedia', 'bMedia', 'cMedia', 'dMedia', 'eMedia']
		const media = keys.map((key) => {
			if (changes[key]) return before[key]?.filter((t: MediaOutput) => !after[key]?.find((a) => a.path === t.path)) ?? []
			return []
		}).flat(1)
		await Promise.all(media.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment)))
	},
	deleted: async ({ before }) => {
		await getSocketEmitter().emitOpenDeleted('pastObjQuestions', before)
		await getSocketEmitter().emitOpenDeleted(`pastObjQuestions/${before.id}`, before)

		const keys = ['questionMedia', 'aMedia', 'bMedia', 'cMedia', 'dMedia', 'eMedia']
		const media = keys.map((key) => before[key] ?? []).flat(1)
		await Promise.all(media.map(async (attachment) => await publishers[EventTypes.DELETEFILE].publish(attachment)))
	}
}