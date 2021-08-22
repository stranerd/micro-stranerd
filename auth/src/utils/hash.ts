import * as bcrypt from 'bcrypt'

export const hash = async (password: string) => {
	const saltRounds = 10
	if (!password) return ''
	return await bcrypt.hash(password, saltRounds)
}

export const hashCompare = async (password: string, hashed: string) => {
	return await bcrypt.compare(password, hashed)
}