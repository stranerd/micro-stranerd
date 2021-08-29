import { generateChangeStreams, mongoose } from '@utils/commons'
import { ReviewFromModel } from '../models/reviews'
import { ReviewChangeStreamCallbacks } from '@utils/changeStreams/users/reviews'

const ReviewSchema = new mongoose.Schema<ReviewFromModel>({
	review: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	tutorId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	userBio: {
		type: Object,
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

export const Review = mongoose.model<ReviewFromModel>('Review', ReviewSchema)

generateChangeStreams<ReviewFromModel>(Review, ReviewChangeStreamCallbacks).then()