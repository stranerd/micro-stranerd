import { generateChangeStreams, mongoose } from '@utils/commons'
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
	subject: {
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
	userRoles: {
		type: mongoose.Schema.Types.Mixed as unknown as QuestionFromModel['userRoles'],
		required: false,
		default: {} as unknown as QuestionFromModel['userRoles']
	},
	data: {
		type: mongoose.Schema.Types.Mixed as unknown as QuestionFromModel['data'],
		required: false,
		default: {} as unknown as QuestionFromModel['data']
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
		type: [Object] as unknown as QuestionFromModel['attachments'],
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Question = mongoose.model<QuestionFromModel>('StranerdQuestion', Schema)

generateChangeStreams<QuestionFromModel, QuestionEntity>(Question, QuestionChangeStreamCallbacks, new QuestionMapper().mapFrom).then()