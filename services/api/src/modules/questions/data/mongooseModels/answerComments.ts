import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerCommentFromModel } from '../models/answerComments'
import { AnswerCommentChangeStreamCallbacks } from '@utils/changeStreams/questions/answerComments'
import { AnswerCommentEntity } from '../../domain/entities/answerComments'
import { AnswerCommentMapper } from '../mappers/answerComments'

const Schema = new mongoose.Schema<AnswerCommentFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	body: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	answerId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as AnswerCommentFromModel['userBio'],
		required: false,
		default: {} as unknown as AnswerCommentFromModel['userBio']
	},
	userRoles: {
		type: mongoose.Schema.Types.Mixed as unknown as AnswerCommentFromModel['userRoles'],
		required: false,
		default: {} as unknown as AnswerCommentFromModel['userRoles']
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

export const AnswerComment = mongoose.model<AnswerCommentFromModel>('StranerdQuestionsAnswerComment', Schema)

generateChangeStreams<AnswerCommentFromModel, AnswerCommentEntity>(AnswerComment, AnswerCommentChangeStreamCallbacks, new AnswerCommentMapper().mapFrom).then()