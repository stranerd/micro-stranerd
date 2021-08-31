import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerCommentFromModel } from '../models'
import { AnswerCommentChangeStreamCallbacks } from '@utils/changeStreams/questions/answerComments'

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
		type: String,
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
		default: Date.now()
	},
	updatedAt: {
		type: Number,
		required: false,
		default: Date.now()
	}
}, { timestamps: { currentTime: Date.now } })

export const AnswerComment = mongoose.model<AnswerCommentFromModel>('AnswerComment', Schema)

generateChangeStreams<AnswerCommentFromModel>(AnswerComment, AnswerCommentChangeStreamCallbacks).then()