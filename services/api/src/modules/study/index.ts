import { TestPrepRepository } from './data/repositories/testPreps'
import { SetRepository } from './data/repositories/sets'
import { VideoRepository } from './data/repositories/videos'
import { NoteRepository } from './data/repositories/notes'
import { FlashCardRepository } from './data/repositories/flashCards'
import { TestRepository } from './data/repositories/tests'
import { TestPrepsUseCase } from './domain/useCases/testPreps'
import { VideosUseCase } from './domain/useCases/videos'
import { NotesUseCase } from './domain/useCases/notes'
import { FlashCardsUseCase } from './domain/useCases/flashCards'
import { TestsUseCase } from './domain/useCases/tests'
import { SetsUseCase } from './domain/useCases/sets'

const testPrepRepository = TestPrepRepository.getInstance()
const setRepository = SetRepository.getInstance()
const videoRepository = VideoRepository.getInstance()
const noteRepository = NoteRepository.getInstance()
const flashCardRepository = FlashCardRepository.getInstance()
const testRepository = TestRepository.getInstance()

export const TestPrepsUseCases = new TestPrepsUseCase(testPrepRepository)
export const VideosUseCases = new VideosUseCase(videoRepository)
export const NotesUseCases = new NotesUseCase(noteRepository)
export const FlashCardsUseCases = new FlashCardsUseCase(flashCardRepository)
export const TestsUseCases = new TestsUseCase(testRepository)
export const SetsUseCases = new SetsUseCase(setRepository)

export { PrepType, PrepData } from './domain/types'
export { TestData, TestType } from './domain/types'
export { SetSaved, SetType } from './domain/types'

export { TestPrepFromModel } from './data/models/testPreps'
export { SetFromModel } from './data/models/sets'
export { VideoFromModel } from './data/models/videos'
export { NoteFromModel } from './data/models/notes'
export { FlashCardFromModel } from './data/models/flashCards'
export { TestFromModel } from './data/models/tests'

export { TestPrepEntity } from './domain/entities/testPreps'
export { SetEntity } from './domain/entities/sets'
export { VideoEntity } from './domain/entities/videos'
export { NoteEntity } from './domain/entities/notes'
export { FlashCardEntity } from './domain/entities/flashCards'
export { TestEntity } from './domain/entities/tests'