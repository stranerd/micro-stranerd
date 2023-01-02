import { ErrorRepository } from './data/repositories/emailErrors'
import { EmailErrorsUseCase } from './domain/useCases/emailErrors'

const errorRepository = ErrorRepository.getInstance()

export const EmailErrorsUseCases = new EmailErrorsUseCase(errorRepository)

export { EmailErrorFromModel } from './data/models/emailErrors'
export { EmailErrorEntity } from './domain/entities/emailErrors'