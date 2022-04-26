import { LocalUploaderRepository } from './data/repositories/localUploader'
import { CloudUploaderRepository } from './data/repositories/cloudUploader'
import { UploaderUseCase } from './domain/usecases/uploader'
import { isDev } from '@utils/environment'

const uploaderRepository = isDev ? new LocalUploaderRepository() : new CloudUploaderRepository()

export const UploaderUseCases = new UploaderUseCase(uploaderRepository)