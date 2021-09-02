import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerCommentFromModel } from '../models'
import { AnswerCommentChangeStreamCallbacks } from '@utils/changeStreams/questions/answerComments'
import { AnswerCommentEntity } from '@modules/questions/domain/entities'
import { AnswerCommentMapper } from '@modules/questions/data/mappers'

const Schema = new mongoose.Schema<AnswerCommentFromModel>({
	body: {
		type: String,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	answerId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	userBio: {
		type: Object,
		required: false,
		default: {}
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
}, { timestamps: { currentTime: Date.now } })

export const AnswerComment = mongoose.model<AnswerCommentFromModel>('StranerdAnswerComment', Schema)

generateChangeStreams<AnswerCommentFromModel, AnswerCommentEntity>(AnswerComment, AnswerCommentChangeStreamCallbacks, new AnswerCommentMapper().mapFrom).then()