import * as Validate from '@stranerd/validate'
import * as bcrypt from 'bcryptjs'
import { ValidationError } from '../errors'
import { StorageFile } from '../storage'
import { Instance } from '../instance'

const isNotTruncated = (file?: StorageFile, error?: string) => {
	error = error ?? `is larger than allowed limit of ${Instance.getInstance().settings.maxFileUploadSizeInMb}mb`
	const valid = file ? !file.isTruncated : true
	return valid ? Validate.isValid() : Validate.isInvalid(error)
}

const isNotTruncatedX = (error?: string) => (val: any) => isNotTruncated(val, error)

export const Validation = { ...Validate, isNotTruncated, isNotTruncatedX }

type Rules = {
	required: boolean
	rules: Validate.Rule[]
}

export function validate<Keys extends Record<string, any>> (data: Keys, rules: Record<keyof Keys, Rules>) {
	const errors = Object.entries(data)
		.map(([key, value]) => ({
			key,
			valid: Validation.Validator.single(value, rules[key].rules, rules[key].required)
		}))

	const failed = errors.some(({ valid }) => !valid.isValid)

	if (failed) throw new ValidationError(
		errors
			.filter(({ valid }) => !valid.isValid)
			.map(({ key, valid }) => ({ field: key, messages: valid.errors }))
	)

	return data
}

const hash = async (password: string) => {
	password = password.trim()
	if (!password) return ''
	return await bcrypt.hash(password, Instance.getInstance().settings.hashSaltRounds)
}

const compare = async (plainPassword: string, hashed: string) => {
	plainPassword = plainPassword.trim()
	if (!plainPassword && plainPassword === hashed) return true
	return await bcrypt.compare(plainPassword, hashed)
}

export const Hash = { hash, compare }