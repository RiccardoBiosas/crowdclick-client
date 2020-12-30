import coingeckoClient from './index'

class CurrencyApi {
  convertUSDToEther (USDAmount, currentEthPrice) {
    const USDAmountToEth = USDAmount / currentEthPrice
    return USDAmountToEth
  }

  async fetchEthToUSD () {
    const response = await coingeckoClient.getEthToUSD()
    return response.data.ethereum.usd
  }
}

export default new CurrencyApi()
