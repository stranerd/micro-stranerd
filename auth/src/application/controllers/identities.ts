import { GoogleSignIn } from '@modules/index'
import { Request, validate } from '@utils/commons'
import { generateAuthOutput } from '@utils/modules/auth'

export class IdentitiesController {
	static async googleSignIn (req: Request) {
		const { idToken } = validate({
			idToken: req.body.idToken
		}, {
			idToken: { required: true, rules: [] }
		})

		const data = await GoogleSignIn.execute(idToken)
		return await generateAuthOutput(data)
	}
}