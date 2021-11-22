import Api from '@/api/index'

const routeMain = 'login'

const post = async params => {
  const result = await Api.post(routeMain, params)

  if (result) {
    return result
  }

  return false
}

export default {
  post,
}
