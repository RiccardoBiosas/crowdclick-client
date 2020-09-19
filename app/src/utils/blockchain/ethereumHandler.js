// theirs
import Web3 from 'web3'
// utils
import { store } from '../../redux/store'
import crowdclickClient from '../api/crowdclick'
// constants
import { NO_METAMASK_ROUTE } from '../../config/routes-config'
import {
  navAuthFalseAction,
  navAuthTrueAction
} from '../../redux/NavAuth/navAuthActions'

class EthereumHandler {
  constructor () {
    this.web3 = null
    this.accounts = []
  }

  async initWeb3 () {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        await this.updateAccounts(accounts)
        window.ethereum.autoRefreshOnNetworkChange = false
        window.ethereum.on('accountsChanged', () =>
          this.logoutOnAccountChange()
        )
        this.web3 = await new Web3(window.ethereum)
        return this.web3
      } catch (err) {
        console.error(err)
        window.location.href = `#${NO_METAMASK_ROUTE}`
      }
    } else {
      window.location.href = `#${NO_METAMASK_ROUTE}`
    }
  }

  async logoutOnAccountChange () {
    const responses = Promise.all([
      this.updateAccounts(),
      crowdclickClient.logout()
    ]).then(response => response)
    store.dispatch(navAuthFalseAction)
    return responses
  }

  async updateAccounts (accounts) {
    this.accounts = accounts || (await this.web3.eth.getAccounts())
    return this.accounts
  }

  async login () {
    try {
      const loginData = await crowdclickClient.login.get()
      if (loginData.data.is_authenticated) {
        store.dispatch(navAuthTrueAction)
        window.localStorage.setItem('userPubKey', this.accounts[0])
        return loginData.data.is_authenticated
      } else {
        return await this.postSignature(loginData.data.nonce)
      }
    } catch (err) {
      store.dispatch(navAuthFalseAction)
      window.localStorage.removeItem('userPubKey')
      console.error(err)
    }
  }

  async postSignature (nonce) {
    const currentAccount = this.accounts[0]
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
      window.localStorage.setItem('userPubKey', this.accounts[0])
      store.dispatch(navAuthTrueAction)
    } else {
      window.localStorage.removeItem('userPubKey')
    }
    return isAuthenticated
  }
}

const ethereumHandler = new EthereumHandler()
export default ethereumHandler
