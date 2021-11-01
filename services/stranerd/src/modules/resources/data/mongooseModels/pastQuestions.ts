import { generateChangeStreams, MediaOutput, mongoose } from '@utils/commons'
import { PastQuestionFromModel, PastQuestionObjFromModel, PastQuestionTheoryFromModel } from '../models/pastQuestions'
import {
	PastQuestionObjChangeStreamCallbacks,
	PastQuestionTheoryChangeStreamCallbacks
} from '@utils/changeStreams/resources/pastQuestions'
import { PastQuestionObjEntity, PastQuestionTheoryEntity } from '../../domain/entities/pastQuestions'
import { PastQuestionObjMapper, PastQuestionTheoryMapper } from '../mappers/pastQuestions'

const genericSchema: mongoose.SchemaDefinition<mongoose.SchemaDefinitionType<PastQuestionFromModel>> = {
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	order: {
		type: Number,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	institutionId: {
		type: String,
		required: true
	},
	courseId: {
		type: String,
		required: true
	},
	question: {
		type: String,
		required: true
	},
	questionMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	},
	answer: {
		type: String,
		required: true
	},
	createdAt: {
		type: Number,
		required: false,
		default: Date.now
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now
	}
}

export const PastQuestionTheory = mongoose.model<PastQuestionTheoryFromModel>('StranerdPastQuestionTheory', new mongoose.Schema({
	...genericSchema,
	answerMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	}
}, { timestamps: { currentTime: Date.now } }))
export const PastQuestionObj = mongoose.model<PastQuestionObjFromModel>('StranerdPastQuestionObj', new mongoose.Schema({
	...genericSchema,
	a: {
		type: String,
		required: true
	},
	b: {
		type: String,
		required: true
	},
	c: {
		type: String,
		required: true
	},
	d: {
		type: String,
		required: true
	},
	e: {
		type: String,
		required: true
	},
	explanation: {
		type: String,
		required: true
	},
	aMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	},
	bMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	},
	cMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	},
	dMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	},
	eMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	},
	explanationMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	}
}, { timestamps: { currentTime: Date.now } }))

generateChangeStreams<PastQuestionTheoryFromModel, PastQuestionTheoryEntity>(PastQuestionTheory, PastQuestionTheoryChangeStreamCallbacks, new PastQuestionTheoryMapper().mapFrom).then()
generateChangeStreams<PastQuestionObjFromModel, PastQuestionObjEntity>(PastQuestionObj, PastQuestionObjChangeStreamCallbacks, new PastQuestionObjMapper().mapFrom).then()