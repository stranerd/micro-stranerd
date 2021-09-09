import { PaymentRepository } from './data/repositories/payment'
import { StripeRepository } from './data/repositories/stripe'
import { CreatePaymentUseCase } from './domain/useCases/payment/create'
import { FindPaymentUseCase } from './domain/useCases/payment/find'
import { MarkAsCompleteUseCase } from './domain/useCases/payment/makeAsComplete'
import { MakeStripePaymentIntentUseCase } from './domain/useCases/stripe/makeStripePaymentIntent'

const stripeRepository = StripeRepository.getInstance()
const paymentRepository = PaymentRepository.getInstance()

export const MakeStripePaymentIntent = new MakeStripePaymentIntentUseCase(stripeRepository)
export const FindPayment = new FindPaymentUseCase(paymentRepository)
export const CreatePayment = new CreatePaymentUseCase(paymentRepository)
export const MarkPaymentAsComplete = new MarkAsCompleteUseCase(paymentRepository)