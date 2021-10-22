import { Auth } from '../../Models'
import shortid from 'shortid'
import { VerifyEmail } from '../../Services'

export default async function (request, h) {
  const { email } = request.payload

  const auth = await Auth.findOne({ email })

  if (auth) {
    auth.emailVerifiedKey = shortid.generate()
  } else {
    return h.response({ message: 'email doesn\'t exist' }).code(404)
  }

  await auth.save()
  await VerifyEmail(email, auth.emailVerifiedKey)

  return { message: 'new verified email sent' }
}
