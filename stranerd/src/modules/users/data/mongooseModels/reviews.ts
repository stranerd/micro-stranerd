import { generateChangeStreams, mongoose } from '@utils/commons'
import { ReviewFromModel } from '../models/reviews'
import { ReviewChangeStreamCallbacks } from '@utils/changeStreams/users/reviews'
import { ReviewEntity } from '@modules/users/domain/entities/reviews'
import { ReviewMapper } from '@modules/users/data/mappers/reviews'

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
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
		required: true
	},
	userBio: {
		type: Object as unknown as ReviewFromModel['userBio'],
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