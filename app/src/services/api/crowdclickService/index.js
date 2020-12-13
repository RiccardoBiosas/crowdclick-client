import AxiosClient from '../axiosHandler'

const hostname = window && window.location.hostname
const domainExpr = RegExp('crowdclick.me')

let hostEnv
if (domainExpr.test(hostname)) {
  hostEnv = 'https://crowdclick.me'
} else {
  hostEnv = 'http://localhost:8000'
}

const client = new AxiosClient({
  baseURL: hostEnv,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

const crowdclickClient = {
  login: {
    get: async () => client.get('/api/auth/'),
    post: async bodyPayload => client.post('/api/auth/', bodyPayload)
  },
  logout: async () => client.get('/api/auth/logout/'),
  getDashboardData: async (networkName = 'goerli') =>
    client.get('/api/task/dashboard/', { params: { chain: networkName } }),
  getDashboardTask: async id => client.get(`/api/task/dashboard/${id}/`),
  getTask: async id => client.get(`/api/task/${id}/`),
  getTasks: async (page, networkName = 'goerli') =>
    client.get(`/api/task/?page=${page}`, {
      params: { chain: networkName }
    }),
  getUserTasks: async (networkName = 'goerli') =>
    client.get('/api/user/tasks/', { params: { chain: networkName } }),
  postTask: async bodyPayload => client.post('/api/task/', bodyPayload),
  patchTask: async (id, bodyPayload) =>
    client.patch(`/api/task/${id}/`, bodyPayload),
  postAnswer: async (id, bodyPayload) =>
    client.post(`/api/task/${id}/answer/`, bodyPayload),
  subscribe: async bodyPayload =>
    client.post('/api/subscribe/', bodyPayload, {
      withCredentials: false
    }),
  getReward: async (id, networkName = 'goerli') =>
    client.post(`/api/task/${id}/reward/`, {
      chain: networkName
    })
}

export default crowdclickClient
