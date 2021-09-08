import { StripeRepository } from './data/repositories/stripe'
import { MakeStripePaymentIntentUseCase } from './domain/useCases/transactions/makeStripePaymentIntent'

const stripeRepository = StripeRepository.getInstance()

export const MakeStripePaymentIntent = new MakeStripePaymentIntentUseCase(stripeRepository)
