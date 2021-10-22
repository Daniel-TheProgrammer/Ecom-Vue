import { User } from '../../Models'

export default async function (request, h) {
  const { params, payload } = request

  try {
    const user = await User.findOneAndUpdate({ _id: params.id }, payload)
    return h.response(user).code(200)
  } catch (error) {
    return h.error({}).code(500)
  }
}
