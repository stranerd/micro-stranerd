import { generateChangeStreams, mongoose } from '@utils/commons'
import { PaymentFromModel } from '../models/payment'
import { PaymentEntity } from '../../domain/entities/payment'
import { PaymentChangeStreamCallbacks } from '@utils/changeStreams/payment/payment'
import { PaymentMapper } from '../mappers/payment'

const PaymentSchema = new mongoose.Schema<PaymentFromModel>({
	_id: {
		type: String,
		default: () => new mongoose.Types.ObjectId() as unknown as string
	},
	type: {
		type: String,
		required: true
	},
	method: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	data: {
		type: Object,
		required: false,
		default: {}
	},
	userId: {
		type: String,
		required: true
	},
	intent: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	isCompleted: {
		type: Boolean,
		required: false,
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
}, { timestamps: { currentTime: Date.now }, minimize: false })

export const Payment = mongoose.model<PaymentFromModel>('StranerdPayment', PaymentSchema)

generateChangeStreams<PaymentFromModel, PaymentEntity>(Payment, PaymentChangeStreamCallbacks, new PaymentMapper().mapFrom).then()
