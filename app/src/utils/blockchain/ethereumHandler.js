// theirs
import Web3 from 'web3'
import Portis from '@portis/web3'
// utils
import { store } from '../../redux/store'
import crowdclickClient from '../api/crowdclick'
// constants
import { HOME_ROUTE, NO_METAMASK_ROUTE } from '../../config/routes-config'
import {
  navAuthFalseAction,
  navAuthTrueAction
} from '../../redux/NavAuth/navAuthActions'
import config from '../../config/env-config'
import {
  MAINNET_TYPE,
  ROPSTEN_TYPE,
  GOERLI_TYPE,
  MUMBAI_TYPE
} from '../../redux/ethereumContract/actions'

const networkNameToContractAction = {
  1: MAINNET_TYPE,
  3: ROPSTEN_TYPE,
  5: GOERLI_TYPE,
  80001: MUMBAI_TYPE
}

export const WALLETS = {
  PORTIS: 'PORTIS',
  METAMASK: 'METAMASK'
}

class EthereumHandler {
  constructor () {
    this.portis = null
    this.web3 = null
    this.account = null
    this.currentNetwork = null
    this.currentWallet = null
  }

  async _initMetamask () {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        this.web3 = new Web3(window.ethereum)
        await this._updateAccounts(accounts)
        this.currentWallet = WALLETS.METAMASK
        await this._setCurrentNetwork()
        window.ethereum.autoRefreshOnNetworkChange = false
        window.ethereum.on('accountsChanged', async () => {
          await this._logoutOnAccountChange()
        })
        window.ethereum.on('chainChanged', async () => {
          await this._logoutOnChainIdChange()
        })
        return {
          account: this.account,
          currentNetwork: this.currentNetwork
        }
      } catch (err) {
        console.error(err)
        window.location.href = `#${NO_METAMASK_ROUTE}`
      }
    } else {
      window.location.href = `#${NO_METAMASK_ROUTE}`
    }
  }

  async initPortisAndLogin (network = 'goerli') {
    const portis = new Portis(config.providers.portis, network)
    this.web3 = new Web3(portis.provider)
    this.currentWallet = WALLETS.PORTIS
    this._setCurrentNetwork()
    this._updateAccounts()
    await this._dispatchWeb3Data()
    const wasLoginSuccessful = await this._login()
    return { portis, wasLoginSuccessful }
  }

  async initWeb3AndLogin () {
    if (
      (this.web3 &&
        this.currentWallet === WALLETS.METAMASK &&
        this.currentNetwork === 5) ||
      this.currentNetwork === 80001
    ) {
      await this._dispatchWeb3Data()
      await this._login()
    } else {
      await this._initMetamask()
      await this._dispatchWeb3Data()
      await this._login()
    }
  }

  async _login () {
    try {
      const loginData = await crowdclickClient.login.get()
      if (loginData.data.is_authenticated) {
        this._performLoginSideEffects()
        return loginData.data.is_authenticated
      } else {
        return await this.postSignature(loginData.data.nonce)
      }
    } catch (err) {
      store.dispatch(navAuthFalseAction)
      this._performLogoutSideEffects()
    }
  }

  async postSignature (nonce) {
    try {
      const currentAccount = this.account
      const signature = await this.web3.eth.personal.sign(
        nonce,
        currentAccount,
        console.log
      )
      const isAuthenticatedResponse = await crowdclickClient.login.post({
        user_address: currentAccount,
        user_signature: signature
      })
      const isAuthenticated = isAuthenticatedResponse.data.is_authenticated
      if (isAuthenticated) {
        this._performLoginSideEffects()
      } else {
        this._performLogoutSideEffects()
      }
      return isAuthenticated
    } catch (err) {
      this._performLogoutSideEffects()
    }
  }

  async _dispatchWeb3Data () {
    await this._setCurrentNetwork()
    console.log(
      'current network about to be dispatched to redux ',
      this.currentNetwork
    )
    const actionType = networkNameToContractAction[this.currentNetwork]
    console.log('action type about to be forwarded', actionType)
    window.localStorage.setItem('chainId', this.currentNetwork)
    store.dispatch({ type: actionType })
  }

  async _updateAccounts (accounts) {
    const updatedAccounts = accounts || (await this.web3.eth.getAccounts())
    this.account = updatedAccounts[0].toLowerCase()
  }

  async _setCurrentNetwork () {
    this.currentNetwork = await this.web3.eth.getChainId()
  }

  _performLoginSideEffects () {
    window.localStorage.setItem('userPubKey', this.account)
    store.dispatch(navAuthTrueAction)
  }

  _performLogoutSideEffects () {
    store.dispatch(navAuthFalseAction)
    window.localStorage.removeItem('userPubKey')
    window.localStorage.removeItem('chainId')
    window.location.href = `#${HOME_ROUTE}`
  }

  async _logoutOnAccountChange () {
    const response = await crowdclickClient.logout()
    this._performLogoutSideEffects()
    return response
  }

  async _logoutOnChainIdChange () {
    // await this._setCurrentNetwork()
    const response = await crowdclickClient.logout()
    this._performLogoutSideEffects()
    return response
  }
}

const ethereumHandler = new EthereumHandler()
export default ethereumHandler
