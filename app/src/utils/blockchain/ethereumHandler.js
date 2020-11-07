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

const WALLETS = {
  PORTIS: 'PORTIS',
  METAMASK: 'METAMASK'
}

const portis = new Portis(config.providers.portis, 'goerli')
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
        console.log('THIS WEB3 IS --- INIT WEB3 ', this.web3)
        await this._setCurrentNetwork()
        await this._updateAccounts(accounts)
        this.currentWallet = WALLETS.METAMASK
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
    console.log('PORTIS INIT PORTIS HERE and the network is -- ', network)
    const portis = new Portis(config.providers.portis, network)
    this.web3 = new Web3(portis.provider)
    this._updateAccounts()
    this.currentWallet = WALLETS.PORTIS
    console.log('portis updated account is 0--', this.account)
    const wasLoginSuccessful = await this._login()
    return wasLoginSuccessful
  }

  async initWeb3AndLogin () {
    if (this.web3 && this.account && this.currentWallet === WALLETS.METAMASK) {
      // console.log(
      //   'what is the current wallet? -- if block-- ',
      //   this.currentWallet
      // )
      // console.log(
      //   'both web3 and this.account -- means that this.web3 has already been defined and is '
      // )
      // console.log('window.ethereum --> ', window.ethereum)
      // console.log('this.web3 --> ', this.web3)
      await this._login()
    } else {
      // console.log('ELSE BLOCK')
      // console.log('window.ethereum else block: ', window.ethereum)
      // console.log(this.web3)
      // console.log(
      //   'what is the current wallet? -- else block-- ',
      //   this.currentWallet
      // )

      await this._initMetamask()
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

  async getCurrentNetwork () {
    if (this.web3) {
      const currentNetwork =
        this.currentNetwork || (await this.web3.eth.getChainId())
      return currentNetwork
    }
    return
  }

  _dispatchContractNetwork (chainId) {
    const actionType = networkNameToContractAction[chainId]
    console.log('WHAT IS CHAIN ID ---? __dispatchcontractnetwork', chainId)
    window.localStorage.setItem('chainId', chainId)
    store.dispatch({ type: actionType })
    // const payload = { type: actionType }
    // console.log('--- dispatch contract network payload', payload)
  }

  async _updateAccounts (accounts) {
    const updatedAccounts = accounts || (await this.web3.eth.getAccounts())
    this.account = updatedAccounts[0].toLowerCase()
  }

  async _setCurrentNetwork () {
    this.currentNetwork = await this.web3.eth.getChainId()
    window.localStorage.setItem('chainId', this.currentNetwork)
    this._dispatchContractNetwork(this.currentNetwork)
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
    window.location.reload()
  }

  async _logoutOnAccountChange () {
    const responses = Promise.all([
      this._updateAccounts(),
      crowdclickClient.logout()
    ]).then(response => console.log(response))
    this._performLogoutSideEffects()
    return responses
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
