import { generateChangeStreams, mongoose } from '@utils/commons'
import { AnswerCommentFromModel } from '../models'
import { AnswerCommentChangeStreamCallbacks } from '@utils/changeStreams/questions/answerComments'
import { AnswerCommentEntity } from '@modules/questions/domain/entities'
import { AnswerCommentMapper } from '@modules/questions/data/mappers'

const Schema = new mongoose.Schema<AnswerCommentFromModel>({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId() as unknown as string
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
		type: Object as unknown as AnswerCommentFromModel['userBio'],
		required: false,
		default: {} as unknown as AnswerCommentFromModel['userBio']
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