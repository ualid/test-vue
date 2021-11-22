const STORE_USERS = (state, users) => {
  state.users = users.data
}
const STORE_USER = (state, user) => {
  state.user = user
}

export default {
  STORE_USERS,
  STORE_USER,
}
