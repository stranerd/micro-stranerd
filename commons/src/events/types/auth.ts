import { MediaOutput } from '../../storage'

export type AuthUserChange = {
	id: string
	data: {
		firstName: string
		lastName: string
		email: string
		photo: MediaOutput | null
	}
}