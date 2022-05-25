import { TestPrepRepository } from './data/repositories/testPreps'
import { SetRepository } from './data/repositories/sets'
import { FileRepository } from './data/repositories/files'
import { FlashCardRepository } from './data/repositories/flashCards'
import { TestRepository } from './data/repositories/tests'
import { TestPrepsUseCase } from './domain/useCases/testPreps'
import { FilesUseCase } from './domain/useCases/files'
import { FlashCardsUseCase } from './domain/useCases/flashCards'
import { TestsUseCase } from './domain/useCases/tests'
import { SetsUseCase } from './domain/useCases/sets'

const testPrepRepository = TestPrepRepository.getInstance()
const setRepository = SetRepository.getInstance()
const fileRepository = FileRepository.getInstance()
const flashCardRepository = FlashCardRepository.getInstance()
const testRepository = TestRepository.getInstance()

export const TestPrepsUseCases = new TestPrepsUseCase(testPrepRepository)
export const FilesUseCases = new FilesUseCase(fileRepository)
export const FlashCardsUseCases = new FlashCardsUseCase(flashCardRepository)
export const TestsUseCases = new TestsUseCase(testRepository)
export const SetsUseCases = new SetsUseCase(setRepository)

export { PrepType, PrepData } from './domain/types'
export { TestData, TestType } from './domain/types'
export { SetSaved } from './domain/types'

export { TestPrepFromModel } from './data/models/testPreps'
export { SetFromModel } from './data/models/sets'
export { FileFromModel } from './data/models/files'
export { FlashCardFromModel } from './data/models/flashCards'
export { TestFromModel } from './data/models/tests'

export { TestPrepEntity } from './domain/entities/testPreps'
export { SetEntity } from './domain/entities/sets'
export { FileEntity } from './domain/entities/files'
export { FlashCardEntity } from './domain/entities/flashCards'
export { TestEntity } from './domain/entities/tests'