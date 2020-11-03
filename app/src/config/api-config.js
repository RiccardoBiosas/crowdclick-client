// ### third-party APIs
export const COINGECKO_API = 'https://api.coingecko.com/api/v3/'
export const ROPSTEN_ETHERSCAN = 'https://ropsten.etherscan.io/'
export const ROPSTEN_ETHERSCAN_TX = 'https://ropsten.etherscan.io/tx/'
export const GOERLI_ETHERSCAN = 'https://goerli.etherscan.io/'
export const GOERLI_ETHERSCAN_TX = 'https://goerli.etherscan.io/tx/'
export const MATIC_MUMBAI_EXPLORER_TX = 'https://mumbai-explorer.matic.today/tx/'

// ### back-end API
let host_env

const hostname = window && window.location.hostname
const domainExpr = RegExp('crowdclick.me')

if (domainExpr.test(hostname)) {
  host_env = 'https://crowdclick.me'
} else {
  host_env = 'http://localhost:8000'
}

export const TASK_ENDPOINT = `${host_env}/api/task/`
export const AUTH_ENDPOINT = `${host_env}/api/auth/`
export const AUTH_LOGOUT_ENDPOINT = `${host_env}/api/auth/logout/`
export const ANSWERS_COLLECTION_ENDPOINT = `${host_env}/api/task/id/answer`
export const DASHBOARD_ENDPOINT = `${host_env}/api/task/dashboard/`
export const SUBSCRIBE_ENDPOINT = `${host_env}/api/subscribe/`
export const REWARD_ENDPOINT = `${host_env}/api/reward/`
export default host_env
