import { AuthApps, BaseEntity } from '@utils/commons'

export class TokenEntity extends BaseEntity {
	public readonly id: string
	public readonly tokens: string[]
	public readonly userId: string
	public readonly app: AuthApps
	public readonly createdAt: number
	public readonly updatedAt: number

	constructor (data: TokenConstructor) {
		super()
		this.id = data.id
		this.tokens = data.tokens
		this.userId = data.userId
		this.app = data.app
		this.createdAt = data.createdAt
		this.updatedAt = data.updatedAt
	}
}

type TokenConstructor = {
	id: string
	tokens: string[],
	userId: string,
	app: AuthApps,
	createdAt: number
	updatedAt: number
}