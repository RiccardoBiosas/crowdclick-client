import coingeckoClient from './index'

class CurrencyApi {
  convertUSDToEther (USDAmount, currentEthPrice) {
    const USDAmountToEth = USDAmount / currentEthPrice
    return USDAmountToEth
  }

  async fetchEthToUSD () {
    return coingeckoClient.getEthToUSD()
  }
}

export default new CurrencyApi()
