import { OmitUser } from '@modules/users'

export { UserBio, OmitUser } from '@modules/users'

export type OmitAnswerInit<Model> = Omit<OmitUser<Model>, 'tags' | 'questionId' | 'coins'>