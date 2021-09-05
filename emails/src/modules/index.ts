import { ErrorRepository } from './data/repositories/errors'
import { AddErrorUseCase } from './domain/useCases/addError'
import { GetAndDeleteAllErrorsUseCase } from './domain/useCases/getAndDeleteAllErrors'

const errorRepository = ErrorRepository.getInstance()

export const AddError = new AddErrorUseCase(errorRepository)
export const GetAndDeleteAllErrors = new GetAndDeleteAllErrorsUseCase(errorRepository)