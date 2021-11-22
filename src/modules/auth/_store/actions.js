import api from '../_api'

const post = async (context, object) => {
  const result = await api.post(object)
  context.commit('STORE_AUTH', result)
}

export default {
  post,
}
