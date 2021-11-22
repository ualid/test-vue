import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import swal from 'sweetalert2'
// eslint-disable-next-line import/no-cycle
import Jwt from '@/api/jwt'
import store from '../store'

import Router from '../router'

const Api = {
  init() {
    Vue.use(VueAxios, axios)

    this.setupHeaders()
    Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL

    Vue.axios.interceptors.response.use(response => response, this.handleError.bind(this))
  },

  setupHeaders() {
    Vue.axios.defaults.headers.common['Content-Type'] = 'application/json'
    Vue.axios.defaults.headers.common.Accept = 'application/json'
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${Jwt.getToken()}`;
    ['get', 'post', 'put', 'patch'].forEach(method => {
      Vue.axios.defaults.headers[method]['Content-Type'] = 'application/json'
    })
  },
  async handleError(errRef) {
    const { response } = errRef
    const code = response.status ? response.status : 0
    let errorMsg = ''
    let typeMessage = 'warning'
    if (Object.prototype.hasOwnProperty.call(response.data, 'message')) errorMsg = response.data.message
    switch (code) {
      case 400:
        this.messageError(response, response.data.message)
        break
      case 0:
      case 401:
        this.messageError(response, response.data.message)
        break

      case 404:
        errorMsg = 'Página não encontrada!'
        this.messageError(response, errorMsg)
        break

      case 406:
        await store.dispatch('$_error/setErrorsNotAcceptable', response.data)
        break

      case 422:
        if (Object.prototype.hasOwnProperty.call(response.data, 'type')) {
          typeMessage = response.data.type
        }

        await store.dispatch('$_messages/setErrors', {
          title: response.data.title,
          message: response.data.message,
          type: typeMessage,
        })

        break

      case 500:
        // eslint-disable-next-line no-unused-expressions
        errorMsg || (errorMsg = 'Aguarde um pouco e tente novamente.')
        this.messageError(response, errorMsg, '', 'Erro interno')
        break
      default:
        break
    }
    // eslint-disable-next-line consistent-return

    return new Promise((resolve, reject) => {
      reject(response)
    })
  },

  messageError(response, errorMsg, timerInterval = '', errorTitle = '') {
    swal.fire({
      type: 'error',
      title: errorTitle,
      text: errorMsg,
      customClass: {
        container: 'handler-error',
      },
      onBeforeOpen: () => {
        swal.showLoading()
      },
      onClose: () => {
        clearInterval(timerInterval)
      },
    })
    if (Object.prototype.hasOwnProperty.call(response, 'status')) {
      if (response.status === 401) {
        Jwt.destroyToken()
        Router.push({ name: 'login' })
      }
    }
  },

  async query(resource, data) {
    const promiseData = new Promise(resolve => {
      const result = Vue.axios.get(resource, { params: data })
      resolve(result)
    })

    return promiseData
  },

  async get(resource, slug = '') {
    const promiseData = new Promise(resolve => {
      const result = Vue.axios.get(`${resource}/${slug}`)
      resolve(result)
    })

    return promiseData
  },

  async post(resource, params) {
    const result = await Vue.axios.post(`${resource}`, JSON.stringify(params))

    return result
  },

  async put(resource, id, params) {
    const route = id ? `${resource}/${id}` : resource
    const result = await Vue.axios.put(route, JSON.stringify(params))

    return result
  },

  patch(resource, id, params) {
    if (id) {
      return Vue.axios.patch(`${resource}/${id}`, JSON.stringify(params))
    }

    return Vue.axios.patch(`${resource}`, JSON.stringify(params))
  },

  delete(resource, id) {
    return new Promise(resolve => {
      const result = Vue.axios.delete(`${resource}/${id}`)
      resolve(result)
    })
  },
}

export default Api
