import { generateChangeStreams, mongoose } from '@utils/commons'
import { ReviewFromModel } from '../models/reviews'
import { ReviewChangeStreamCallbacks } from '@utils/changeStreams/users/reviews'
import { ReviewEntity } from '../../domain/entities/reviews'
import { ReviewMapper } from '../mappers/reviews'

const ReviewSchema = new mongoose.Schema<ReviewFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	review: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true
	},
	tutorId: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	userBio: {
		type: mongoose.Schema.Types.Mixed as unknown as ReviewFromModel['userBio'],
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
}, { timestamps: { currentTime: Date.now } })

export const Review = mongoose.model<ReviewFromModel>('StranerdReview', ReviewSchema)

generateChangeStreams<ReviewFromModel, ReviewEntity>(Review, ReviewChangeStreamCallbacks, new ReviewMapper().mapFrom).then()