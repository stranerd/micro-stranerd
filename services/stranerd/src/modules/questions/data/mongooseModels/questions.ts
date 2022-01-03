import { generateChangeStreams, MediaOutput, mongoose } from '@utils/commons'
import { QuestionFromModel } from '../models/questions'
import { QuestionChangeStreamCallbacks } from '@utils/changeStreams/questions/questions'
import { QuestionEntity } from '../../domain/entities/questions'
import { QuestionMapper } from '../mappers/questions'

const Schema = new mongoose.Schema<QuestionFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	body: {
		type: String,
		required: true
	},
	tags: {
		type: [String],
		set: (tags: string[]) => Array.from(new Set(tags)),
		required: true
	},
	subjectId: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as QuestionFromModel['userBio'],
		required: false,
		default: {} as unknown as QuestionFromModel['userBio']
	},
	bestAnswers: {
		type: [String],
		required: false,
		default: []
	},
	answers: {
		type: [Object as unknown as any],
		required: false,
		default: []
	},
	attachments: {
		type: [Object] as unknown as MediaOutput[],
		required: false,
		default: []
	},
	commentsCount: {
		type: Number,
		required: false,
		default: 0
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

export const Question = mongoose.model<QuestionFromModel>('StranerdQuestion', Schema)

generateChangeStreams<QuestionFromModel, QuestionEntity>(Question, QuestionChangeStreamCallbacks, new QuestionMapper().mapFrom).then()