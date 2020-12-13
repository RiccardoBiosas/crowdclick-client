// services
import { store } from '../../redux/store'
import crowdclickClient from '../api/crowdclickService'
// constants
import {
  navAuthFalseAction,
  navAuthTrueAction
} from '../../redux/NavAuth/navAuthActions'
import {
  HOME_ROUTE,
  NO_METAMASK_ROUTE
} from '../../constants/config/routes-config'
import { CONNECTORS_ERROR, WALLETS } from '../../constants/blockchain'
import walletConnectProvider from '../../repositories/walletConnectConnector' // should be in another function to pick correct provider based on network
// utils
import {
  initWeb3Session,
  web3SignMessage,
  getWeb3Account,
  getWeb3NetworkId,
  stringLowerCaseComparison,
  getUserAddressFromLocalStorage,
  cacheWeb3DataToLocalStorage,
  getWalletConnectorByNetwork,
  cleanLocalStorage,
  getContractByNetwork,
  checkSupportedChain,
  convertChainIdToNetworkName
} from '../../utils'

/**
 * fix boolean blindness
 */
/**
 * TODO:
 * think about better error handling process for contract error & wrong network (CHANGE NAME IN INITMETAMASK UPDATEWEB3RESPONSE)
 * think about localstorage: are there possible improvements?
 * think about the flow: login side effect, logout side effect.
 * THINK ABOUT TRY CATCH: WHERE SHOULD IT BE CALLED SO THAT IT DOESN'T CRASH WITH AN ERROR BUT STILL LET THE CONSUMER COMPONENT KNOW THAT SOMETHING WENT WRONG
 * FIX CLOSE MODAL CRASH ERROR WITH WALLET CONNECT. related to the point above about error handling
 * replace redux?
 * add singleton pattern
 * remember that walletconnect add value to localstorage on its own, so use custom localstorage value just for walletconnect to namespace it
 * move it to backend once in the future you'll switch to redux
 * maybe - not priority- change currentNetwork to chainId
 * FIX: portis crashes if i am on a non-supported chain
 */

class EthereumHandler {
  constructor () {
    this.portis = null
    this.provider = null
    this.account = getUserAddressFromLocalStorage() || null
    this.currentChainId = null
    this.currentNetwork = null
    this.currentWallet = null
    this.currentContract = null
    this.contractAddress = null
    this.wasLocalStorageChecked = false
    this.active = false
  }

  getWeb3Singleton () {
    return {
      web3Provider: this.provider,
      account: this.account,
      active: this.active,
      currentNetwork: this.currentNetwork,
      currentChainId: this.currentChainId,
      currentWallet: this.currentWallet,
      wasLocalStorageChecked: this.wasLocalStorageChecked,
      currentContract: this.currentContract,
      contractAddress: this.contractAddress
    }
  }

  async initCachedWeb3 () {
    try {
      const currentAccount = await getWeb3Account()
      if (!this.wasLocalStorageChecked) {
        this.wasLocalStorageChecked = true
        const cachedAccount = getUserAddressFromLocalStorage()
        console.groupCollapsed('ethereumHandler initCachedWeb3')
        console.log('getweb3account: ', currentAccount)
        console.log('cached account: ', cachedAccount)
        console.groupEnd()
        const isCachedAccountEqualToCurrentAccount = stringLowerCaseComparison(
          currentAccount,
          cachedAccount
        )
        console.groupCollapsed('ethereumHandler initCachedWeb3')
        console.log('getweb3account: ', currentAccount)
        console.log('cached account: ', cachedAccount)
        console.log(
          'isCachedAccountEqualToCurrentAccount: ',
          isCachedAccountEqualToCurrentAccount
        )
        console.groupEnd()
        if (
          !currentAccount ||
          !cachedAccount ||
          !isCachedAccountEqualToCurrentAccount
        ) {
          console.log(
            'inside INITCACHEWEB3 ----: contract is active? not active  '
          )
          await this.disconnectFromWeb3AndLogout()
        } else {
          console.log('inside INITCACHEWEB3 ----: contract is active? TRUE!  ')
          this.active = true
          this.account = currentAccount
          this.currentNetwork = 'goerli' // HARDCODED!
          this.currentChainId = 5 //REPLACE hardcoded value!
          this.currentWallet = 'METAMASK' // REPLACE hardcoded value!
          await this.initMetamask() // hardcoded, use the previous wallet?
          const contractData = getContractByNetwork(
            this.currentChainId,
            this.provider,
            this.account
          )
          console.log('CONTRACTDATA: ', contractData)
          this.currentContract = contractData.contract
          this.contractAddress = contractData.contractAddress
        }
      }
    } catch (error) {
      console.error(error)
      this._performLogoutSideEffects()
      return {
        wasLoginSuccessful: false,
        error: CONNECTORS_ERROR.GENERIC_ERROR
      }
    } finally {
      this.wasLocalStorageChecked = true
    }
  }

  async initMetamask () {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        this.provider = await initWeb3Session(WALLETS.METAMASK, window.ethereum)
        // REPLACE THE NAME!
        const a = await this._updateWeb3SessionData(WALLETS.METAMASK)
        if (a.error) {
          return {
            wasLoginSuccessful: false,
            error: a.error
          }
        }
        const response = await this._login()
        console.log('INIT METAMASK RESPONSE: ', response)

        if (response.wasLoginSuccessful) {
          this._performLoginSideEffects()
        }
        return response // STANDARDIZE IT INTO ENUM FOR SUCCESS AND UNSUCCESSFUL, EXPLAIN WHY UNSUCCESSFUL
      } catch (error) {
        console.error(error)
        window.location.href = `#${NO_METAMASK_ROUTE}`
        return {
          wasLoginSuccessful: false,
          error: error.message
        }
      }
    } else {
      window.location.href = `#${NO_METAMASK_ROUTE}`
    }
  }

  async initPortisAndLogin (chainId) {
    const portis = getWalletConnectorByNetwork(chainId, WALLETS.PORTIS)
    console.log('portis: ', portis)
    this.provider = initWeb3Session(WALLETS.PORTIS, portis.provider)
    console.log('provider: ', this.provider)
    await this._updateWeb3SessionData(WALLETS.PORTIS)
    const response = await this._login()
    if (response.wasLoginSuccessful) {
      this._performLoginSideEffects()
    }
    return response
  }

  async initWalletConnect (network = 'goerli') {
    try {
      await walletConnectProvider.enable()
      this.provider = initWeb3Session(
        WALLETS.WALLETCONNECT,
        walletConnectProvider
      )
      await this._updateWeb3SessionData(WALLETS.WALLETCONNECT, 5) // network is hardcoded, replace
      const response = await this._login()
      if (response.wasLoginSuccessful) {
        this._performLoginSideEffects()
      }

      return response
    } catch (error) {
      console.error(error)
      return {
        wasLoginSuccessful: false,
        error: CONNECTORS_ERROR.GENERIC_ERROR
      }
      /** silencing in case the user closes the modal and the walletConnectProvider.enable promise doesn't fulfill: to be improved  */
    } finally {
      // await walletConnectProvider.disconnect()
    }
  }

  /** use reset with ethers.js? */
  async disconnectFromWeb3AndLogout () {
    this._performLogoutSideEffects() // perform side effects before logging out
    const response = await crowdclickClient.logout()
    return response
  }

  /************************************
   * PRIVATE FUNCTIONS
   ************************************
   */

  async _login () {
    console.log('INSIDE LOGIN, walletconnect')
    try {
      const loginData = await crowdclickClient.login.get()
      if (loginData.data.is_authenticated) {
        this._performLoginSideEffects()
        return {
          wasLoginSuccessful: true,
          error: false
        }
      } else {
        const isAuthenticated = await this._postSignature(loginData.data.nonce)
        if (!isAuthenticated) {
          return {
            wasLoginSuccessful: false,
            error: CONNECTORS_ERROR.WRONG_SIGNATURE
          }
        } else {
          return {
            wasLoginSuccessful: true,
            error: false
          }
        }
      }
    } catch (error) {
      console.error(error)
      this._performLogoutSideEffects()
      return {
        wasLoginSuccessful: false,
        error: CONNECTORS_ERROR.GENERIC_ERROR
      }
    }
  }

  async _postSignature (nonce) {
    const currentAccount = await getWeb3Account(
      this.provider,
      this.currentWallet
    )
    console.groupCollapsed('_postSignature method')
    console.log('this.provider: ', this.provider)
    console.log('current account: ', currentAccount)
    console.log('current wallet ', this.currentWallet)
    console.groupEnd()
    const signature = await web3SignMessage(
      this.currentWallet,
      this.provider,
      nonce
    )
    console.log('signature: ', signature)
    const isAuthenticatedResponse = await crowdclickClient.login.post({
      user_address: currentAccount.toLowerCase(),
      user_signature: signature.toLowerCase()
    })
    console.log('isauthenticated response: ', isAuthenticatedResponse)
    const isAuthenticated = isAuthenticatedResponse.data.is_authenticated
    return isAuthenticated
  }

  async _updateWeb3SessionData (_walletType, _setNetwork) {
    this.currentWallet = _walletType
    this.account = await getWeb3Account(this.provider, this.currentWallet)
    this.active = true
    this.currentChainId = await getWeb3NetworkId(
      this.provider,
      this.currentWallet
    )
    const supportedChain = checkSupportedChain(this.currentChainId)
    if (!supportedChain) {
      return {
        error: CONNECTORS_ERROR.NOT_SUPPORTED_NETWORK
      }
    }
    this.currentNetwork = convertChainIdToNetworkName(this.currentChainId)
    const contractData = getContractByNetwork(
      this.currentChainId,
      this.provider,
      this.account,
      this.currentWallet
    )
    this.currentContract = contractData.contract
    this.contractAddress = contractData.contractAddress
    this.wasLocalStorageChecked = true
    console.groupCollapsed('_updateWeb3SessionData')
    console.log('contractData: ', contractData)
    console.log('this.account: ', this.account)
    console.log('_setNetwork: ', _setNetwork)
    console.log('_walletType', this.currentWallet)
    console.log('this.provider ', this.provider)
    console.log('this.currentChainId: ', this.currentChainId)
    console.log('this.currentcontracts: ', this.currentContract)
    console.groupEnd()
    return {
      error: false
    }
  }

  _performLoginSideEffects () {
    window.ethereum.autoRefreshOnNetworkChange = false
    window.ethereum.on('accountsChanged', async () => {
      await this.disconnectFromWeb3AndLogout()
    })
    window.ethereum.on('chainChanged', async () => {
      await this.disconnectFromWeb3AndLogout()
    })

    cacheWeb3DataToLocalStorage(
      this.account,
      this.currentChainId,
      this.currentWallet
    )
    store.dispatch(navAuthTrueAction)
  }

  _performLogoutSideEffects () {
    store.dispatch(navAuthFalseAction)
    cleanLocalStorage()
    window.location.href = `#${HOME_ROUTE}`
  }
}

export default new EthereumHandler()
