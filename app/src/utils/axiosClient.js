import axios from 'axios'

class AxiosClient {
  constructor (axiosConfig) {
    this.client = axios.create(axiosConfig)
    this.client.interceptors.response.use((response) => {
      return response
    }, 
    (error) => {
      if(error.response.status === 401) {
        console.log('NOT AUTHORIZED FROM AXIOS INTERCEPTOR!')
      }
    })
    // this.client.interceptors.request(() => {})
  }

  get (endpoint, config) {
    return this.client.request({
      method: 'GET',
      url: endpoint,
      responseType: 'json',
      ...config
    })
  }

  patch (endpoint, bodyPayload, config) {
    return this.client.request({
      method: 'PATCH',
      url: endpoint,
      responseType: 'json',
      data: bodyPayload,
      ...config
    })
  }

  post (endpoint, bodyPayload, config) {
    return this.client.request({
      method: 'POST',
      url: endpoint,
      responseType: 'json',
      data: bodyPayload,
      ...config
    })
  }

  put (endpoint, bodyPayload, config) {
    return this.client.request({
      method: 'PUT',
      url: endpoint,
      responseType: 'json',
      data: bodyPayload,
      ...config
    })
  }

  delete (endpoint, bodyPayload, config) {
    return this.client.request({
      method: 'DELETE',
      url: endpoint,
      responseType: 'json',
      data: bodyPayload,
      ...config
    })
  }
}

export default AxiosClient
