import { Auth } from '../../Models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uuid from 'uuid/v4'
import { readFileSync } from 'fs';
import path from 'path'

const privateCert = readFileSync(
  path.resolve(__dirname, '../../private.key')
)

export default async function (request, h) {
  const { email, password, refreshToken, user } = request.payload
  const SALT_ROUNDS = 8
  let isValid = false

  const auth = email
    ? await Auth.findOne({ email }).populate('user')
    : await Auth.findOne({ user }).populate('user')

  if (!auth) {
    return h.response({ message: 'Nay good' }).code(404)
  }

  if (password) {
    isValid = await bcrypt.compare(password, auth.hashedPassword)
  } else {
    isValid = await checkRefreshToken(auth.refreshTokens, refreshToken)
    if (!isValid) {
      return h.response({ message: 'Invalid token' }).code(403)
    }
  }

  if (isValid) {
    const refreshToken = uuid()
    const user = auth.user

    const hashedRefreshToken = await bcrypt.hash(refreshToken, SALT_ROUNDS)

    auth.refreshTokens.unshift(hashedRefreshToken)

    const authToken = jwt.sign({ user }, privateCert, {
      algorithm: 'RS256',
      expiresIn: 4000
    })

    await auth.save()

    return h.response({ user, authToken, refreshToken })
  } else {
    return h.response({ message: 'invalid credentials' }).code(401)
  }
}

async function checkRefreshToken (authRefresh, refresh) {
  for (let i = 0; i < authRefresh.length; i++) {
    if (await bcrypt.compare(refresh, authRefresh[i])) {
      authRefresh.splice(i, 1)
      return true
    }
  }

  return false
}
