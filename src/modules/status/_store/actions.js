import api from '../_api'

const get = async (context, object) => {
  const result = await api.get(object)
  context.commit('STORE_STATUSES', result)
}

export default {
  get,
}
