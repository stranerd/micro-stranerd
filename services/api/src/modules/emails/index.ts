import { ErrorRepository } from './data/repositories/errors'
import { ErrorsUseCase } from './domain/useCases/errors'

const errorRepository = ErrorRepository.getInstance()

export const EmailErrorsUseCases = new ErrorsUseCase(errorRepository)

export { ErrorFromModel } from './data/models/errors'
export { ErrorEntity } from './domain/entities/errors'