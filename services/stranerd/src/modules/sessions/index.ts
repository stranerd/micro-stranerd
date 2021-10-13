import { ChatRepository } from './data/repositories/chat'
import { SessionRepository } from './data/repositories/session'
import { ChatMetaRepository } from './data/repositories/chatMeta'
import { GetChatsMetaUseCase } from './domain/usecases/chatMeta/getChatsMeta'
import { UpdateBioUseCase } from './domain/usecases/chatMeta/updateBio'
import { UpdateUserBiosUseCase } from './domain/usecases/chatMeta/updateUserBios'
import { FindChatMetaUseCase } from './domain/usecases/chatMeta/findChatMeta'
import { GetChatsUseCase } from './domain/usecases/chats/getChats'
import { FindChatUseCase } from './domain/usecases/chats/findChat'
import { AddChatUseCase } from './domain/usecases/chats/addChat'
import { MarkChatReadUseCase } from './domain/usecases/chats/markChatRead'
import { FindSessionUseCase } from './domain/usecases/sessions/findSession'
import { GetSessionsUseCase } from './domain/usecases/sessions/getSessions'
import { AddSessionUseCase } from './domain/usecases/sessions/addSession'
import { AcceptSessionUseCase } from './domain/usecases/sessions/acceptSession'
import { CancelSessionUseCase } from './domain/usecases/sessions/cancelSession'
import { UpdateMySessionsBioUseCase } from './domain/usecases/sessions/updateMySessionsBio'
import { UpdateTaskIdAndStartedAtUseCase } from './domain/usecases/sessions/updateTaskIdAndStartedAt'
import { MarkSessionDoneUseCase } from './domain/usecases/sessions/markSessionDone'

const personalChatRepository = ChatRepository.getInstance()
const chatMetaRepository = ChatMetaRepository.getInstance()
const sessionRepository = SessionRepository.getInstance()

export const FindChat = new FindChatUseCase(personalChatRepository)
export const GetChats = new GetChatsUseCase(personalChatRepository)
export const AddChat = new AddChatUseCase(personalChatRepository)
export const MarkChatRead = new MarkChatReadUseCase(personalChatRepository)

export const FindSession = new FindSessionUseCase(sessionRepository)
export const GetSessions = new GetSessionsUseCase(sessionRepository)
export const AddSession = new AddSessionUseCase(sessionRepository)
export const AcceptSession = new AcceptSessionUseCase(sessionRepository)
export const CancelSession = new CancelSessionUseCase(sessionRepository)
export const UpdateMySessionsBio = new UpdateMySessionsBioUseCase(sessionRepository)
export const UpdateTaskIdAndStartedAt = new UpdateTaskIdAndStartedAtUseCase(sessionRepository)
export const MarkSessionDone = new MarkSessionDoneUseCase(sessionRepository)

export const FindChatMeta = new FindChatMetaUseCase(chatMetaRepository)
export const GetChatsMeta = new GetChatsMetaUseCase(chatMetaRepository)
export const UpdateChatMetaBio = new UpdateBioUseCase(chatMetaRepository)
export const UpdateChatMetaUserBios = new UpdateUserBiosUseCase(chatMetaRepository)

export { SessionFromModel } from './data/models/session'
export { ChatFromModel } from './data/models/chat'
export { ChatMetaFromModel } from './data/models/chatMeta'
export { SessionEntity } from './domain/entities/session'
export { ChatEntity } from './domain/entities/chat'
export { ChatMetaEntity } from './domain/entities/chatMeta'