import { LocalUploaderRepository } from '../data/repositories/localUploader'
import { UploadFileUseCase } from './usecases/uploadFile'
import { DeleteFileUseCase } from './usecases/deleteFile'
import { isDev } from '@utils/environment'
import { CloudUploaderRepository } from '../data/repositories/cloudUploader'

const uploaderRepository = isDev ? new LocalUploaderRepository() : new CloudUploaderRepository()

export const UploadFile = new UploadFileUseCase(uploaderRepository)
export const DeleteFile = new DeleteFileUseCase(uploaderRepository)