import { PlanRepository } from './data/repositories/plans'
import { TransactionRepository } from './data/repositories/transactions'
import { CardRepository } from './data/repositories/cards'
import { WalletRepository } from './data/repositories/wallets'
import { PlansUseCase } from './domain/useCases/plans'
import { TransactionsUseCase } from './domain/useCases/transactions'
import { CardsUseCase } from './domain/useCases/cards'
import { WalletsUseCase } from './domain/useCases/wallets'

const planRepository = PlanRepository.getInstance()
const transactionRepository = TransactionRepository.getInstance()
const cardRepository = CardRepository.getInstance()
const walletRepository = WalletRepository.getInstance()

export const PlansUseCases = new PlansUseCase(planRepository)
export const TransactionsUseCases = new TransactionsUseCase(transactionRepository)
export const CardsUseCases = new CardsUseCase(cardRepository)
export const WalletsUseCases = new WalletsUseCase(walletRepository)

export { PlanFromModel, PlanToModel } from './data/models/plans'
export { TransactionFromModel } from './data/models/transactions'
export { CardFromModel, CardToModel } from './data/models/cards'
export { WalletFromModel } from './data/models/wallets'
export { PlanEntity } from './domain/entities/plans'
export { TransactionEntity } from './domain/entities/transactions'
export { CardEntity } from './domain/entities/cards'
export { WalletEntity } from './domain/entities/wallets'
export { Currencies, TransactionType, TransactionStatus, PlanDataType, CurrencyCountries } from './domain/types'
