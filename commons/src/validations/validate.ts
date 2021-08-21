import * as Validation from '@stranerd/validate'
import { ValidationError } from '../errors'

export { Validation }

type Rules = {
	required: boolean
	rules: Validation.Rule[]
}

export function validate<Key extends string> (data: Record<Key, any>, rules: Record<Key, Rules>) {
	const errors = Object.entries(data)
		.map(([key, value]) => ({
			key,
			valid: Validation.Validator.single(value, rules[key].rules, rules[key].required)
		}))
		.filter((r) => !r.valid.isValid)
		.map(({ key, valid }) => ({ field: key, messages: valid.errors }))

	if (errors.length > 0) throw new ValidationError(errors)

	return data
}