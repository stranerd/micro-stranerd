import { ChatRepository } from './data/repositories/chat'
import { SessionRepository } from './data/repositories/session'
import { ChatMetaRepository } from './data/repositories/chatMeta'
import { SessionsUseCase } from './domain/useCases/sessions'
import { ChatsUseCase } from './domain/useCases/chats'
import { ChatMetasUseCase } from './domain/useCases/chatMetas'

const personalChatRepository = ChatRepository.getInstance()
const chatMetaRepository = ChatMetaRepository.getInstance()
const sessionRepository = SessionRepository.getInstance()

export const SessionsUseCases = new SessionsUseCase(sessionRepository)
export const ChatsUseCases = new ChatsUseCase(personalChatRepository)
export const ChatMetasUseCases = new ChatMetasUseCase(chatMetaRepository)

export { SessionFromModel } from './data/models/session'
export { ChatFromModel } from './data/models/chat'
export { ChatMetaFromModel } from './data/models/chatMeta'
export { SessionEntity } from './domain/entities/session'
export { ChatEntity } from './domain/entities/chat'
export { ChatMetaEntity } from './domain/entities/chatMeta'