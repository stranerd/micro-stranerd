import { TestPrepRepository } from './data/repositories/testPreps'
import { SetRepository } from './data/repositories/sets'
import { DocumentRepository } from './data/repositories/documents'
import { FlashCardRepository } from './data/repositories/flashCards'
import { TestRepository } from './data/repositories/tests'
import { TestPrepsUseCase } from './domain/useCases/testPreps'
import { DocumentsUseCase } from './domain/useCases/documents'
import { FlashCardsUseCase } from './domain/useCases/flashCards'
import { TestsUseCase } from './domain/useCases/tests'
import { SetsUseCase } from './domain/useCases/sets'

const testPrepRepository = TestPrepRepository.getInstance()
const setRepository = SetRepository.getInstance()
const documentRepository = DocumentRepository.getInstance()
const flashCardRepository = FlashCardRepository.getInstance()
const testRepository = TestRepository.getInstance()

export const TestPrepsUseCases = new TestPrepsUseCase(testPrepRepository)
export const DocumentsUseCases = new DocumentsUseCase(documentRepository)
export const FlashCardsUseCases = new FlashCardsUseCase(flashCardRepository)
export const TestsUseCases = new TestsUseCase(testRepository)
export const SetsUseCases = new SetsUseCase(setRepository)

export { PrepType, PrepData } from './domain/types'
export { TestData, TestType } from './domain/types'
export { SetSaved } from './domain/types'

export { TestPrepFromModel } from './data/models/testPreps'
export { SetFromModel } from './data/models/sets'
export { DocumentFromModel } from './data/models/documents'
export { FlashCardFromModel } from './data/models/flashCards'
export { TestFromModel } from './data/models/tests'

export { TestPrepEntity } from './domain/entities/testPreps'
export { SetEntity } from './domain/entities/sets'
export { DocumentEntity } from './domain/entities/documents'
export { FlashCardEntity } from './domain/entities/flashCards'
export { TestEntity } from './domain/entities/tests'