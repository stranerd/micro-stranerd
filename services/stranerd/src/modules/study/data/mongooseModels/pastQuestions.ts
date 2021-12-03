import { generateChangeStreams, MediaOutput, mongoose } from '@utils/commons'
import { PastQuestionFromModel } from '../models/pastQuestions'
import { PastQuestionEntity } from '../../domain/entities/pastQuestions'
import { PastQuestionChangeStreamCallbacks } from '@utils/changeStreams/study/pastQuestions'
import { PastQuestionMapper } from '../mappers/pastQuestions'

const Schema = new mongoose.Schema<PastQuestionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
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
		type: [mongoose.Schema.Types.ObjectId] as unknown as MediaOutput[],
		required: false,
		default: []
	},
	data: {
		type: mongoose.Schema.Types.ObjectId as unknown as PastQuestionFromModel['data'],
		required: true,
		default: {} as unknown as PastQuestionFromModel['data']
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const PastQuestion = mongoose.model<PastQuestionFromModel>('StranerdPastQuestion', Schema)

generateChangeStreams<PastQuestionFromModel, PastQuestionEntity>(PastQuestion, PastQuestionChangeStreamCallbacks, new PastQuestionMapper().mapFrom).then()
