import api from '../_api'

const get = async (context, object) => {
  const result = await api.get(object)
  context.commit('STORE_USERS', result)
}

const show = async (context, object) => {
  const result = await api.show(object)
  context.commit('STORE_USER', result)
}
const update = async (context, object) => {
  await api.update(object)
}
const post = async (context, object) => {
  await api.post(object)
}

export default {
  get,
  show,
  post,
  update,
}
