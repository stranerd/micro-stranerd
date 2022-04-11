import * as Validate from '@stranerd/validate'
import { ValidationError } from '../errors'

export const Validation = Validate

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