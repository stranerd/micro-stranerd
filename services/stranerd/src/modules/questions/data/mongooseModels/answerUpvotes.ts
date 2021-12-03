import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerUpvoteFromModel } from '../models/answerUpvotes'
import { AnswerUpvoteChangeStreamCallbacks } from '@utils/changeStreams/questions/answerUpvotes'
import { AnswerUpvoteEntity } from '../../domain/entities/answerUpvotes'
import { AnswerUpvoteMapper } from '../mappers/answerUpvotes'

const Schema = new mongoose.Schema<AnswerUpvoteFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	vote: {
		type: Number,
		required: true,
		default: 1
	},
	userId: {
		type: String,
		required: true
	},
	answerId: {
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const AnswerUpvote = mongoose.model<AnswerUpvoteFromModel>('StranerdAnswerUpvote', Schema)

generateChangeStreams<AnswerUpvoteFromModel, AnswerUpvoteEntity>(AnswerUpvote, AnswerUpvoteChangeStreamCallbacks, new AnswerUpvoteMapper().mapFrom).then()