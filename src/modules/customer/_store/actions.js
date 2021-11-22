import api from '../_api'

const get = async (context, object) => {
  const result = await api.get(object)
  context.commit('STORE_CUSTOMERS', result)
}

const show = async (context, id) => {
  const result = await api.show(id)
  context.commit('STORE_CUSTOMER', result)
}
const deleteCustomer = async (context, object) => {
  await api.deleteCustomer(object)
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
  deleteCustomer,
}
