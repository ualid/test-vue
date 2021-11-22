import Api from '@/api/index'

const routeMain = 'numbers'

const get = async params => {
  const result = await Api.query(routeMain, params)

  if (result) {
    return result
  }

  return false
}

const show = async id => {
  const result = await Api.query(`${routeMain}/${id}`)
  if (result) {
    return result
  }

  return false
}

const post = async params => {
  const result = await Api.post(routeMain, params)

  if (result) {
    return result
  }

  return false
}

const update = async params => {
  const { id, ...data } = params

  const result = await Api.put(routeMain, id, data)

  if (result) {
    return result
  }

  return false
}

const deleteNumber = async id => {
  const result = await Api.delete(routeMain, id)

  if (result) {
    return result
  }

  return false
}

export default {
  get,
  show,
  post,
  update,
  deleteNumber,
}
