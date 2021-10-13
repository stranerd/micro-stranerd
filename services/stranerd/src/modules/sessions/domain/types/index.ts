import { MediaOutput } from '@utils/commons'

export { UserBio } from '@modules/users'

export type Media = MediaOutput

export type CancelReason = 'tutor' | 'busy' | 'student'
export type TaskID = string | number | null