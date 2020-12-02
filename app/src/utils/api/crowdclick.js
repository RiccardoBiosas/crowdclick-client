import AxiosClient from '../axiosClient'
import host_env from '../../config/api-config'

const client = new AxiosClient({
  baseURL: host_env,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export const crowdclickClient = {
  login: {
    get: async () => {
      return await client.get(`${host_env}/api/auth/`)
    },
    post: async bodyPayload => {
      return await client.post(`${host_env}/api/auth/`, bodyPayload)
    }
  },
  logout: async () => {
    return await client.get(`${host_env}/api/auth/logout/`)
  },
  getDashboardData: async () => {
    return await client.get(`${host_env}/api/task/dashboard/`)
  },
  getDashboardTask: async (id) => {
    return await client.get(`${host_env}/api/task/dashboard/${id}/`)
  },
  getTask: async id => {
    return await client.get(`${host_env}/api/task/${id}/`)
  },
  getTasks: async (page, networkName='goerli') => {
    return await client.get(`${host_env}/api/task/?page=${page}`, { params: { chain: networkName } })
  },
  getUserTasks: async () => {
    return await client.get(`${host_env}/api/user/tasks/`)
  },
  postTask: async bodyPayload => {
    return await client.post(`${host_env}/api/task/`, bodyPayload)
  },
  patchTask: async (id, bodyPayload) => {
    return await client.patch(`${host_env}/api/task/${id}/`, bodyPayload)
  },
  postAnswer: async (id, bodyPayload) => {
    return await client.post(`${host_env}/api/task/${id}/answer/`, bodyPayload)
  },
  subscribe: async bodyPayload => {
    return await client.post(`${host_env}/api/subscribe/`, bodyPayload, {
      withCredentials: false
    })
  },
  getReward: async (id, networkName='goerli') => {
    return await client.post(`${host_env}/api/task/${id}/reward/`, {chain: networkName})
  }
}

export default crowdclickClient
