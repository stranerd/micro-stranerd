import { GoogleSignIn } from '@modules/index'
import { Request, validate } from '@utils/commons'
import { generateAuthOutput } from '@utils/modules/auth'

export class IdentitiesController {
	static async googleSignIn (req: Request) {
		const validatedData = validate({
			idToken: req.body.idToken,
			referrer: req.body.referrer
		}, {
			idToken: { required: true, rules: [] },
			referrer: { required: false, rules: [] }
		})

		const data = await GoogleSignIn.execute(validatedData)
		return await generateAuthOutput(data)
	}
}