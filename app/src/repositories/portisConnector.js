import Portis from '@portis/web3'
import config from '../constants/config/env-config'

/**
 *
 * @param {number} networkName
 * wrap portis connector in a function to avoid unnecessarily initializing the portis widget
 */
export const portisConnectors = networkName => {
  console.log('received networkname: ', networkName)
  switch (networkName) {
    case 'goerli':
      return new Portis(config.providers.portis, 'goerli')
    case 'mumbai':
      return new Portis(config.providers.portis, 'mumbai')
    default:
      return
  }
}
