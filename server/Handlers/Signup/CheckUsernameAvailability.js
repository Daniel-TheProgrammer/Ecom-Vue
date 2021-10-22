import { Auth } from '../../Models'

export default async function (request, h) {
  const { email } = request.payload

  if (await Auth.findOne({ email })) {
    return h.response({ message: 'User already exists' }).code(409)
  } else {
    return h.response({message: 'All good man'}).code(200)
  }
}