import bcrypt from 'bcrypt'
import { Auth } from '../../Models'

export default async function (request, h) {
  console.log('in')
  const { _id } = request.auth.credentials
  const { refreshToken } = request.payload

  const auth = await Auth.findOne({ user: _id }).populate('user')

  if (!auth) {
    return h.response({ message: 'You aren\'t logged in anway' }).code(404)
  }
  console.log('tits')
  await removeRefreshToken(auth.refreshTokens, refreshToken)

  await auth.save()

  return true
}

async function removeRefreshToken (authRefresh, refresh) {
  for (const ref of authRefresh) {
    const same = await bcrypt.compare(refresh, ref)
    if (same) {
      const index = authRefresh.indexOf(ref)
      authRefresh.splice(index, 1)
    }
  }
}
