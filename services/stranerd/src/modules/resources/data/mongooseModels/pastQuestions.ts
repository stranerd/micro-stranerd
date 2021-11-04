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
	answer: {
		type: String,
		required: true
	},
	answerMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	}
}, { timestamps: { currentTime: Date.now } }))
export const PastQuestionObj = mongoose.model<PastQuestionObjFromModel>('StranerdPastQuestionObj', new mongoose.Schema({
	...genericSchema,
	correctIndex: {
		type: Number,
		required: true
	},
	options: {
		type: [String],
		required: true
	},
	optionsMedia: {
		type: [[Object]] as unknown as MediaOutput[][],
		required: false,
		default: []
	},
	explanation: {
		type: String,
		required: true
	},
	explanationMedia: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	}
}, { timestamps: { currentTime: Date.now } }))

generateChangeStreams<PastQuestionTheoryFromModel, PastQuestionTheoryEntity>(PastQuestionTheory, PastQuestionTheoryChangeStreamCallbacks, new PastQuestionTheoryMapper().mapFrom).then()
generateChangeStreams<PastQuestionObjFromModel, PastQuestionObjEntity>(PastQuestionObj, PastQuestionObjChangeStreamCallbacks, new PastQuestionObjMapper().mapFrom).then()