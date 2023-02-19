import { mongoose } from '@utils/app/package'
import { appInstance } from '@utils/app/types'
import { ReferralDbChangeCallbacks } from '@utils/changeStreams/users/referrals'
import { ReferralEntity } from '../../domain/entities/referrals'
import { ReferralMapper } from '../mappers/referrals'
import { ReferralFromModel } from '../models/referrals'

const ReferralSchema = new mongoose.Schema<ReferralFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	userId: {
		type: String,
		required: true
	},
	referred: {
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

export const Referral = mongoose.model<ReferralFromModel>('StranerdUsersReferral', ReferralSchema)

export const ReferralChange = appInstance.db
	.generateDbChange<ReferralFromModel, ReferralEntity>(Referral, ReferralDbChangeCallbacks, new ReferralMapper().mapFrom)