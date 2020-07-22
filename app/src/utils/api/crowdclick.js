import axios from 'axios'
import host_env from '../../config/api-config'

const client = axios.create({
    baseURL: host_env,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default client