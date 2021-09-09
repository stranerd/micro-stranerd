import { StripeRepository } from './data/repositories/stripe'
import { PaymentRepository } from './data/repositories/payment'
import { MakeStripePaymentIntentUseCase } from './domain/useCases/stripe/makeStripePaymentIntent'
import { ConfirmStripePaymentSuccessUseCase } from './domain/useCases/stripe/confirmStripePaymentSuccess'
import { CreatePaymentUseCase } from './domain/useCases/payment/createPayment'
import { FindPaymentUseCase } from './domain/useCases/payment/findPayment'
import { MarkAsCompleteUseCase } from './domain/useCases/payment/markPaymentAsComplete'

const stripeRepository = StripeRepository.getInstance()
const paymentRepository = PaymentRepository.getInstance()

export const MakeStripePaymentIntent = new MakeStripePaymentIntentUseCase(stripeRepository)
export const ConfirmStripePaymentSuccess = new ConfirmStripePaymentSuccessUseCase(stripeRepository)

export const FindPayment = new FindPaymentUseCase(paymentRepository)
export const CreatePayment = new CreatePaymentUseCase(paymentRepository)
export const MarkPaymentAsComplete = new MarkAsCompleteUseCase(paymentRepository)