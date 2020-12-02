const { coingeckoClient } = require('./api/coingecko')

const convertUsdToEther = async USDAmount => {
  const ethPrice = await coingeckoClient.getEthToUSD()
  const currentEthPrice = ethPrice.data.ethereum.usd
  const USDAmountToEth = USDAmount / currentEthPrice
  return USDAmountToEth
}

export default convertUsdToEther
