import { PlanRepository } from './data/repositories/plans'
import { TransactionRepository } from './data/repositories/transactions'
import { CardRepository } from './data/repositories/cards'
import { PlansUseCase } from './domain/useCases/plans'
import { TransactionsUseCase } from './domain/useCases/transactions'
import { CardsUseCase } from './domain/useCases/cards'

const planRepository = PlanRepository.getInstance()
const transactionRepository = TransactionRepository.getInstance()
const cardRepository = CardRepository.getInstance()

export const PlansUseCases = new PlansUseCase(planRepository)
export const TransactionsUseCases = new TransactionsUseCase(transactionRepository)
export const CardsUseCases = new CardsUseCase(cardRepository)

export { PlanFromModel, PlanToModel } from './data/models/plans'
export { TransactionFromModel } from './data/models/transactions'
export { CardFromModel } from './data/models/cards'
export { PlanEntity } from './domain/entities/plans'
export { TransactionEntity } from './domain/entities/transactions'
export { CardEntity } from './domain/entities/cards'
export { Currencies, TransactionType, TransactionStatus } from './domain/types'
