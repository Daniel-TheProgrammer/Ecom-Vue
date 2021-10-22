import { User } from '../../Models'

export default async function (request, h) {
  const { id } = request.params
  try {
    const user = await User.findOne({ _id: id })
    return h.response(user).code(200)
  } catch (error) {
    return h.error({}).code(500)
  }
}
