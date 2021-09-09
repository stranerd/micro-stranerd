import { generateChangeStreams, mongoose } from '@utils/commons'
import { PaymentFromModel } from '../models/payment'
import { PaymentEntity } from '@modules/payments/domain/entities/payment'
import { PaymentChangeStreamCallbacks } from '@utils/changeStreams/payment/payment'
import { PaymentMapper } from '../mappers/answers'

const PaymentSchema = new mongoose.Schema<PaymentFromModel>({
	type: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	isGold: {
		type: Boolean,
		required: false,
		default: false
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	isCompleted: {
		type: Boolean,
		required: true,
		default: false
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

export const Payment = mongoose.model<PaymentFromModel>('StranerdPayment', PaymentSchema)

generateChangeStreams<PaymentFromModel, PaymentEntity>(Payment, PaymentChangeStreamCallbacks, new PaymentMapper().mapFrom).then()
