import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerUpvoteFromModel } from '../models'
import { AnswerUpvoteChangeStreamCallbacks } from '@utils/changeStreams/questions/answerUpvotes'
import { AnswerUpvoteEntity } from '@modules/questions/domain/entities'
import { AnswerUpvoteMapper } from '@modules/questions/data/mappers'

const Schema = new mongoose.Schema<AnswerUpvoteFromModel>({
	vote: {
		type: Number,
		required: true,
		default: 1
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	answerId: {
		type: String,
		required: true
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

export const AnswerUpvote = mongoose.model<AnswerUpvoteFromModel>('AnswerUpvote', Schema)

generateChangeStreams<AnswerUpvoteFromModel, AnswerUpvoteEntity>(AnswerUpvote, AnswerUpvoteChangeStreamCallbacks, new AnswerUpvoteMapper().mapFrom).then()