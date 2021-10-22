import bcrypt from 'bcrypt'
import { Auth, User } from '../../Models'
import { VerifyEmail } from '../../Services'

export default async function (request, h) {
  const { firstName, lastName, email, hashedPassword } = request.payload

  if (!firstName || !lastName || !email || !hashedPassword) {
    return h.response({ message: 'Malformed request' }).code(400)
  }

  try {
    if (await Auth.findOne({ email })) {
      return h.response({ message: 'User already exists' }).code(409)
    }

    const user = new User({
      firstName,
      lastName
    })

    await user.save()

    const saltRounds = 8
    const hashPass = await bcrypt.hash(hashedPassword, saltRounds)

    const auth = new Auth({
      email,
      hashedPassword: hashPass,
      user
    })

    await auth.save()
    console.log(auth)
    await VerifyEmail(email, auth.emailVerifiedKey)

    return auth
  } catch (error) {
    console.log(error)
    return h.response({ errorMessage: error.message }).code(500)
  }
}
