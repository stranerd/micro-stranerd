import { AuthUseCases } from '@modules/auth'
import { Request, validate, Validation } from '@utils/app/package'
import { generateAuthOutput, verifyReferrer } from '@utils/modules/auth'

export class IdentitiesController {
	static async googleSignIn (req: Request) {
		const validatedData = validate({
			idToken: req.body.idToken,
			referrer: req.body.referrer ?? null
		}, {
			idToken: { required: true, rules: [Validation.isString()] },
			referrer: { required: true, nullable: true, rules: [Validation.isString()] }
		})

		const data = await AuthUseCases.googleSignIn({
			...validatedData,
			referrer: await verifyReferrer(validatedData.referrer) ? validatedData.referrer : null
		})
		return await generateAuthOutput(data)
	}

	static async appleSignIn (req: Request) {
		const { firstName, lastName, email, idToken, referrer } = validate({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			idToken: req.body.idToken,
			referrer: req.body.referrer ?? null
		}, {
			firstName: { required: true, nullable: true, rules: [Validation.isString()] },
			lastName: { required: true, nullable: true, rules: [Validation.isString()] },
			email: { required: true, nullable: true, rules: [Validation.isString()] },
			idToken: { required: true, rules: [Validation.isString()] },
			referrer: { required: true, nullable: true, rules: [Validation.isString()] }
		})

		const data = await AuthUseCases.appleSignIn({
			data: { idToken, email, firstName, lastName },
			referrer
		})
		return await generateAuthOutput(data)
	}
}