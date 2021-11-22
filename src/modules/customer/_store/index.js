import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const state = {
  customers: [],
  customer: {},
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
