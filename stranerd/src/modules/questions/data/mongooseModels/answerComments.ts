import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerCommentFromModel } from '../models'
import { AnswerCommentChangeStreamCallbacks } from '@utils/changeStreams/questions/answerComments'

const Schema = new mongoose.Schema<AnswerCommentFromModel>({
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
		type: Object,
		required: false,
		default: {}
	}
})

export const AnswerComment = mongoose.model<AnswerCommentFromModel>('AnswerComment', Schema)

generateChangeStreams<AnswerCommentFromModel>(AnswerComment, AnswerCommentChangeStreamCallbacks).then()