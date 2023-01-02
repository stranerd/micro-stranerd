import { EmailErrorRepository } from './data/repositories/emailErrors'
import { PhoneErrorRepository } from './data/repositories/phoneErrors'
import { EmailErrorsUseCase } from './domain/useCases/emailErrors'
import { PhoneErrorsUseCase } from './domain/useCases/phoneErrors'

const emailErrorRepository = EmailErrorRepository.getInstance()
const phoneErrorRepository = PhoneErrorRepository.getInstance()

export const EmailErrorsUseCases = new EmailErrorsUseCase(emailErrorRepository)
export const PhoneErrorsUseCases = new PhoneErrorsUseCase(phoneErrorRepository)

export { EmailErrorFromModel } from './data/models/emailErrors'
export { PhoneErrorFromModel } from './data/models/phoneErrors'
export { EmailErrorEntity } from './domain/entities/emailErrors'
export { PhoneErrorEntity } from './domain/entities/phoneErrors'