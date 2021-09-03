
import { ChatRepository } from './data/repositories/chat'
import { SessionRepository } from './data/repositories/session'
import { GetChatsUseCase } from './domain/usecases/chats/getChats'
import { GetChatsMetaUseCase } from './domain/usecases/chatMeta/getChatsMeta'
import { AddChatUseCase } from './domain/usecases/chats/addChat'
import { MarkChatReadUseCase } from './domain/usecases/chats/markChatRead'
import { GetSessionUseCase } from './domain/usecases/sessions/getSession'
import { GetSessionsUseCase } from './domain/usecases/sessions/getSessions'
import { AddSessionUseCase } from './domain/usecases/sessions/addSession'
import { BeginSessionUseCase } from './domain/usecases/sessions/beginSession'
import { CancelSessionUseCase } from './domain/usecases/sessions/cancelSession'
import { ChatEntity } from './domain/entities/chat'
import { ChatMetaEntity } from './domain/entities/chatMeta'
import { SessionEntity } from './domain/entities/session'
import { ChatMetaRepository } from './data/repositories/chatMeta'


const personalChatRepository = ChatRepository.getInstance()
const chatMetaRepository = ChatMetaRepository.getInstance()
const sessionRepository = SessionRepository.getInstance()

export const GetPersonalChats = new GetChatsUseCase(personalChatRepository)
export const GetPersonalChatsMeta = new GetChatsMetaUseCase(chatMetaRepository)
export const AddPersonalChat = new AddChatUseCase(personalChatRepository)
export const MarkPersonalChatRead = new MarkChatReadUseCase(personalChatRepository)

export const GetSession = new GetSessionUseCase(sessionRepository)
export const GetSessions = new GetSessionsUseCase(sessionRepository)
export const AddSession = new AddSessionUseCase(sessionRepository)
export const BeginSession = new BeginSessionUseCase(sessionRepository)
export const CancelSession = new CancelSessionUseCase(sessionRepository)

export { ChatEntity, ChatMetaEntity }
export { SessionEntity }
