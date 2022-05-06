import { ClassRepository } from './data/repositories/classes'
import { AnnouncementRepository } from './data/repositories/announcements'
import { GroupRepository } from './data/repositories/groups'
import { DiscussionRepository } from './data/repositories/discussions'
import { EventRepository } from './data/repositories/events'
import { ClassesUseCase } from './domain/useCases/classes'
import { AnnouncementsUseCase } from './domain/useCases/announcements'
import { GroupsUseCase } from './domain/useCases/groups'
import { DiscussionsUseCase } from './domain/useCases/discussions'
import { EventsUseCase } from './domain/useCases/events'

const classRepository = ClassRepository.getInstance()
const announcementRepository = AnnouncementRepository.getInstance()
const groupRepository = GroupRepository.getInstance()
const discussionRepository = DiscussionRepository.getInstance()
const eventRepository = EventRepository.getInstance()

export const ClassesUseCases = new ClassesUseCase(classRepository)
export const AnnouncementsUseCases = new AnnouncementsUseCase(announcementRepository)
export const GroupsUseCases = new GroupsUseCase(groupRepository)
export const DiscussionsUseCases = new DiscussionsUseCase(discussionRepository)
export const EventsUseCases = new EventsUseCase(eventRepository)

export { AnnouncementFromModel } from './data/models/announcements'
export { ClassFromModel } from './data/models/classes'
export { DiscussionFromModel } from './data/models/discussions'
export { GroupFromModel } from './data/models/groups'
export { EventFromModel } from './data/models/events'

export { AnnouncementEntity } from './domain/entities/announcements'
export { ClassEntity } from './domain/entities/classes'
export { DiscussionEntity } from './domain/entities/discussions'
export { GroupEntity } from './domain/entities/groups'
export { EventEntity } from './domain/entities/events'

export { EventType, ClassUsers } from './domain/types'