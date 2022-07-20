import { PlanRepository } from './data/repositories/plans'
import { TransactionRepository } from './data/repositories/transactions'
import { PlansUseCase } from './domain/useCases/plans'
import { TransactionsUseCase } from './domain/useCases/transactions'

const planRepository = PlanRepository.getInstance()
const transactionRepository = TransactionRepository.getInstance()

export const PlansUseCases = new PlansUseCase(planRepository)
export const TransactionsUseCases = new TransactionsUseCase(transactionRepository)

export { PlanFromModel, PlanToModel } from './data/models/plans'
export { TransactionFromModel } from './data/models/transactions'
export { PlanEntity } from './domain/entities/plans'
export { TransactionEntity } from './domain/entities/transactions'
export { Currencies, TransactionType, TransactionStatus } from './domain/types'
