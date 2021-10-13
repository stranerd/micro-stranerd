import * as bcrypt from 'bcrypt'

export const hash = async (password: string) => {
	const saltRounds = 10
	if (!password) return ''
	return await bcrypt.hash(password.trim(), saltRounds)
}

export const hashCompare = async (password: string, hashed: string) => {
	return await bcrypt.compare(password.trim(), hashed)
}