import Api from '@/api/index'

const routeMain = 'statuses'

const get = async params => {
  const result = await Api.query(routeMain, params)
  console.log({ result })
  if (result) {
    return result
  }

  return false
}

export default {
  get,
}
