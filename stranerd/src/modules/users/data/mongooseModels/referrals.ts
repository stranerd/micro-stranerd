import { generateChangeStreams, mongoose } from '@utils/commons'
import { ReferralFromModel } from '../models/referrals'
import { ReferralChangeStreamCallbacks } from '@utils/changeStreams/users/referrals'
import { ReferralEntity } from '@modules/users/domain/entities/referrals'
import { ReferralMapper } from '@modules/users/data/mappers/referrals'

const ReferralSchema = new mongoose.Schema<ReferralFromModel>({
	userId: {
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
		required: true
	},
	referred: {
		type: mongoose.Schema.Types.ObjectId as unknown as StringConstructor,
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

export const Referral = mongoose.model<ReferralFromModel>('StranerdReferral', ReferralSchema)

generateChangeStreams<ReferralFromModel, ReferralEntity>(Referral, ReferralChangeStreamCallbacks, new ReferralMapper().mapFrom).then()