// ### third-party API
export const COINGECKO_API = 'https://api.coingecko.com/api/v3/'

// ### back-end API
let host_env;

const hostname = window && window.location.hostname;
console.log("API CONFIG HOSTNAME:", hostname)

if(hostname === "https://crowdclick.me") {
    host_env = "https://crowdclick.me"
} else {
    // host_env = process.env.REACT_APP_CROWDCLICK_HOST_LOCAL    
    host_env = 'http://localhost:8000'
}

// export const SUBSCRIBE_ENDPOINT = `${host_env}${process.env.REACT_APP_CROWDCLICK_SUBSCRIBE}`

// export const TASK_ENDPOINT = `${host_env}${process.env.REACT_APP_CROWDCLICK_TASK}`

// export const AUTH_ENDPOINT = `${host_env}${process.env.REACT_APP_CROWDCLICK_AUTH}`

// export const AUTH_LOGOUT_ENDPOINT =`${host_env}${process.env.REACT_APP_CROWDCLICK_AUTH_LOGOUT}`

// export const ANSWERS_COLLECTION_ENDPOINT = `${host_env}/api/task/id/answer`




export const TASK_ENDPOINT = `${host_env}/api/task/`
export const AUTH_ENDPOINT = `${host_env}/api/auth/`
export const AUTH_LOGOUT_ENDPOINT = `${host_env}/api/auth/logout/`
export const ANSWERS_COLLECTION_ENDPOINT = `${host_env}/api/task/id/answer`
export const DASHBOARD_ENDPOINT = `${host_env}/api/task/dashboard/`
export const SUBSCRIBE_ENDPOINT = `${host_env}/api/subscribe/`




