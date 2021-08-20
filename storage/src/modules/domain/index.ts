import { LocalUploaderRepository } from '../data/repositories/localUploader'
import { UploadFileUseCase } from './usecases/uploadFile'
import { DeleteFileUseCase } from './usecases/deleteFile'

const uploaderRepository = new LocalUploaderRepository()

export const UploadFile = new UploadFileUseCase(uploaderRepository)
export const DeleteFile = new DeleteFileUseCase(uploaderRepository)