import { ChatRepository } from './data/repositories/chat'
import { SessionRepository } from './data/repositories/session'
import { ChatMetaRepository } from './data/repositories/chatMeta'
import { GetChatsMetaUseCase } from './domain/usecases/chatMeta/getChatsMeta'
import { UpdateBioUseCase } from './domain/usecases/chatMeta/updateBio'
import { UpdateChatMetasUserBioUseCase } from './domain/usecases/chatMeta/updateChatMetasUserBio'
import { FindChatMetaUseCase } from './domain/usecases/chatMeta/findChatMeta'
import { GetChatsUseCase } from './domain/usecases/chats/getChats'
import { FindChatUseCase } from './domain/usecases/chats/findChat'
import { AddChatUseCase } from './domain/usecases/chats/addChat'
import { MarkChatReadUseCase } from './domain/usecases/chats/markChatRead'
import { DeleteSessionChatsUseCase } from './domain/usecases/chats/deleteSessionChats'
import { FindSessionUseCase } from './domain/usecases/sessions/findSession'
import { GetSessionsUseCase } from './domain/usecases/sessions/getSessions'
import { AddSessionUseCase } from './domain/usecases/sessions/addSession'
import { AcceptSessionUseCase } from './domain/usecases/sessions/acceptSession'
import { CancelSessionUseCase } from './domain/usecases/sessions/cancelSession'
import { EndSessionUseCase } from './domain/usecases/sessions/endSession'
import { UpdateSessionsUserBioUseCase } from './domain/usecases/sessions/updateSessionsUserBio'
import { UpdateTaskIdsAndTimesUseCase } from './domain/usecases/sessions/updateTaskIdsAndTimes'
import { MarkSessionDoneUseCase } from './domain/usecases/sessions/markSessionDone'

const personalChatRepository = ChatRepository.getInstance()
const chatMetaRepository = ChatMetaRepository.getInstance()
const sessionRepository = SessionRepository.getInstance()

export const FindChat = new FindChatUseCase(personalChatRepository)
export const GetChats = new GetChatsUseCase(personalChatRepository)
export const AddChat = new AddChatUseCase(personalChatRepository)
export const MarkChatRead = new MarkChatReadUseCase(personalChatRepository)
export const DeleteSessionChats = new DeleteSessionChatsUseCase(personalChatRepository)

export const FindSession = new FindSessionUseCase(sessionRepository)
export const GetSessions = new GetSessionsUseCase(sessionRepository)
export const AddSession = new AddSessionUseCase(sessionRepository)
export const AcceptSession = new AcceptSessionUseCase(sessionRepository)
export const CancelSession = new CancelSessionUseCase(sessionRepository)
export const EndSession = new EndSessionUseCase(sessionRepository)
export const UpdateSessionsUserBio = new UpdateSessionsUserBioUseCase(sessionRepository)
export const UpdateTaskIdsAndTimes = new UpdateTaskIdsAndTimesUseCase(sessionRepository)
export const MarkSessionDone = new MarkSessionDoneUseCase(sessionRepository)

export const FindChatMeta = new FindChatMetaUseCase(chatMetaRepository)
export const GetChatsMeta = new GetChatsMetaUseCase(chatMetaRepository)
export const UpdateChatMetaBio = new UpdateBioUseCase(chatMetaRepository)
export const UpdateChatMetasUserBio = new UpdateChatMetasUserBioUseCase(chatMetaRepository)

export { SessionFromModel } from './data/models/session'
export { ChatFromModel } from './data/models/chat'
export { ChatMetaFromModel } from './data/models/chatMeta'
export { SessionEntity } from './domain/entities/session'
export { ChatEntity } from './domain/entities/chat'
export { ChatMetaEntity } from './domain/entities/chatMeta'