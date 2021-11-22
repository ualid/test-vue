import Api from '@/api/index'

const routeMain = 'users'

const get = async params => {
  const result = await Api.query(routeMain, params)

  if (result) {
    return result
  }

  return false
}

export default {
  get,
}
