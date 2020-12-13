import AxiosClient from '../axiosHandler'
import { COINGECKO_API } from '../../../constants/config/api-config'

const client = new AxiosClient({
  baseURL: COINGECKO_API,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: false
})

const coingeckoClient = {
  getEthToUSD: async () => {
    return client.get(
      `simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`
    )
  }
}

export default coingeckoClient
