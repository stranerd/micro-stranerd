import { BaseEntity } from '@stranerd/api-commons'

export class SubjectEntity extends BaseEntity {
	public readonly id: string
	public readonly name: string
	public readonly createdAt: number

	constructor ({ id, name, createdAt }: SubjectConstructorArgs) {
		super()
		this.id = id
		this.name = capitalize(name)
		this.createdAt = createdAt
	}
}

type SubjectConstructorArgs = { id: string, name: string, createdAt: number }

const capitalize = (value: string) => {
	const c = (v: string) => (v[0]?.toUpperCase() ?? '') + v.slice(1)
	return value.trim().split(' ').map(c).join(' ')
}
