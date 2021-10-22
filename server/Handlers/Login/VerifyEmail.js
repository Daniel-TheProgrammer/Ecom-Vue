import { Auth } from '../../Models'

export default async function (request, h) {
  const { email, key } = request.query

  const auth = await Auth.findOne({ email })

  if (!auth) {
    return h.response({ message: 'Email not found' }).code(400)
  }

  if (auth.emailVerifiedKey === key) {
    auth.emailVerified = true
    await auth.save()
    return { message: 'email has been verified' }
  } else {
    return h.response({ message: 'key is invalid' }).code(404)
  }
}
