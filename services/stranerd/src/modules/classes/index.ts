import { ClassRepository } from './data/repositories/classes'
import { AnnouncementRepository } from './data/repositories/announcements'
import { GroupRepository } from './data/repositories/groups'
import { DiscussionRepository } from './data/repositories/discussions'
import { GetClassesUseCase } from './domain/useCases/classes/getClasses'
import { FindClassUseCase } from './domain/useCases/classes/findClass'
import { AddClassUseCase } from './domain/useCases/classes/addClass'
import { UpdateClassUseCase } from './domain/useCases/classes/updateClass'
import { DeleteClassUseCase } from './domain/useCases/classes/deleteClass'
import { UpdateClassesUserBioUseCase } from './domain/useCases/classes/updateClassesUserBio'
import { GetAnnouncementsUseCase } from './domain/useCases/announcements/getAnnouncements'
import { FindAnnouncementUseCase } from './domain/useCases/announcements/findAnnouncement'
import { AddAnnouncementUseCase } from './domain/useCases/announcements/addAnnouncement'
import { UpdateAnnouncementUseCase } from './domain/useCases/announcements/updateAnnouncement'
import { DeleteAnnouncementUseCase } from './domain/useCases/announcements/deleteAnnouncement'
import { UpdateAnnouncementsUserBioUseCase } from './domain/useCases/announcements/updateAnnouncementsUserBio'
import { UpdateAnnouncementsUsersUseCase } from './domain/useCases/announcements/updateAnnouncementsUsers'
import { GetGroupsUseCase } from './domain/useCases/groups/getGroups'
import { FindGroupUseCase } from './domain/useCases/groups/findGroup'
import { AddGroupUseCase } from './domain/useCases/groups/addGroup'
import { UpdateGroupUseCase } from './domain/useCases/groups/updateGroup'
import { DeleteGroupUseCase } from './domain/useCases/groups/deleteGroup'
import { UpdateGroupsUsersUseCase } from './domain/useCases/groups/updateGroupsUsers'
import { GetDiscussionsUseCase } from './domain/useCases/discussions/getDiscussions'
import { FindDiscussionUseCase } from './domain/useCases/discussions/findDiscussion'
import { AddDiscussionUseCase } from './domain/useCases/discussions/addDiscussion'
import { UpdateDiscussionUseCase } from './domain/useCases/discussions/updateDiscussion'
import { DeleteDiscussionUseCase } from './domain/useCases/discussions/deleteDiscussion'
import { UpdateDiscussionsUserBioUseCase } from './domain/useCases/discussions/updateDiscussionsUserBio'

const classRepository = ClassRepository.getInstance()
const announcementRepository = AnnouncementRepository.getInstance()
const groupRepository = GroupRepository.getInstance()
const discussionRepository = DiscussionRepository.getInstance()

export const GetClasses = new GetClassesUseCase(classRepository)
export const FindClass = new FindClassUseCase(classRepository)
export const AddClass = new AddClassUseCase(classRepository)
export const UpdateClass = new UpdateClassUseCase(classRepository)
export const DeleteClass = new DeleteClassUseCase(classRepository)
export const UpdateClassesUserBio = new UpdateClassesUserBioUseCase(classRepository)

export const GetAnnouncements = new GetAnnouncementsUseCase(announcementRepository)
export const FindAnnouncement = new FindAnnouncementUseCase(announcementRepository)
export const AddAnnouncement = new AddAnnouncementUseCase(announcementRepository)
export const UpdateAnnouncement = new UpdateAnnouncementUseCase(announcementRepository)
export const DeleteAnnouncement = new DeleteAnnouncementUseCase(announcementRepository)
export const UpdateAnnouncementsUserBio = new UpdateAnnouncementsUserBioUseCase(announcementRepository)
export const UpdateAnnouncementsUsers = new UpdateAnnouncementsUsersUseCase(announcementRepository)

export const GetGroups = new GetGroupsUseCase(groupRepository)
export const FindGroup = new FindGroupUseCase(groupRepository)
export const AddGroup = new AddGroupUseCase(groupRepository)
export const UpdateGroup = new UpdateGroupUseCase(groupRepository)
export const DeleteGroup = new DeleteGroupUseCase(groupRepository)
export const UpdateGroupsUsers = new UpdateGroupsUsersUseCase(groupRepository)

export const GetDiscussions = new GetDiscussionsUseCase(discussionRepository)
export const FindDiscussion = new FindDiscussionUseCase(discussionRepository)
export const AddDiscussion = new AddDiscussionUseCase(discussionRepository)
export const UpdateDiscussion = new UpdateDiscussionUseCase(discussionRepository)
export const DeleteDiscussion = new DeleteDiscussionUseCase(discussionRepository)
export const UpdateDiscussionsUserBio = new UpdateDiscussionsUserBioUseCase(discussionRepository)

export { AnnouncementFromModel } from './data/models/announcements'
export { ClassFromModel } from './data/models/classes'
export { DiscussionFromModel } from './data/models/discussions'
export { GroupFromModel } from './data/models/groups'

export { AnnouncementEntity } from './domain/entities/announcements'
export { ClassEntity } from './domain/entities/classes'
export { DiscussionEntity } from './domain/entities/discussions'
export { GroupEntity } from './domain/entities/groups'