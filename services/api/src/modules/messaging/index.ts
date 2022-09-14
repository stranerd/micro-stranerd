import { ChatRepository } from './data/repositories/chat'
import { ChatMetaRepository } from './data/repositories/chatMeta'
import { ChatsUseCase } from './domain/useCases/chats'
import { ChatMetasUseCase } from './domain/useCases/chatMetas'

const personalChatRepository = ChatRepository.getInstance()
const chatMetaRepository = ChatMetaRepository.getInstance()

export const ChatsUseCases = new ChatsUseCase(personalChatRepository)
export const ChatMetasUseCases = new ChatMetasUseCase(chatMetaRepository)

export { ChatFromModel } from './data/models/chat'
export { ChatMetaFromModel } from './data/models/chatMeta'
export { ChatEntity } from './domain/entities/chat'
export { ChatMetaEntity } from './domain/entities/chatMeta'
export { ChatType, ChatData } from './domain/types'