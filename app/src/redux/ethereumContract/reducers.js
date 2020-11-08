import config from '../../config/env-config'
import { Drizzle } from '@drizzle/store'

import { MAINNET_ID, ROPSTEN_ID, GOERLI_ID, MUMBAI_ID } from './actions'
import { MAINNET_TYPE, ROPSTEN_TYPE, GOERLI_TYPE, MUMBAI_TYPE } from './actions'
import { ethers } from 'ethers'
import ethereumHandler from '../../utils/blockchain/ethereumHandler'

const blockchainConfig = config.blockchain

// TO DO: improve & remove side effect/reliance on local storage
const initialWeb3State = {
  active: false,
  web3Provider: null,
  currentNetwork: null,
  account: null,
  currentWallet: null,
  currentContracts: null
}

const ethereumContractReducer = (state = initialWeb3State, action) => {
  console.log(
    'ETHEREUM CONTRACT REDUCER ABOUT TO BE UPDATED --- ACTION: ',
    action
  )
  console.log('ethereum contract reducer state is: ', state)
  switch (action.type) {
    case MAINNET_TYPE:
      return {
        ...state,
        active: true,
        currentContracts: null,
        currentNetwork: ethereumHandler.currentNetwork
      }
    case ROPSTEN_TYPE:
      return {
        ...state,
        active: true,
        currentContracts: null,
        currentNetwork: ethereumHandler.currentNetwork
      }
    case GOERLI_TYPE:
      console.log('goerli TYPE WAS HIT')
      return {
        ...state,
        active: true,
        currentContracts: blockchainConfig[GOERLI_ID].contracts,
        web3Provider: ethereumHandler.web3,
        account: ethereumHandler.account,
        currentWallet: ethereumHandler.currentWallet,
        currentNetwork: ethereumHandler.currentNetwork
      }
    case MUMBAI_TYPE:
      console.log('MUMBAI TYPE WAS HIT')
      return {
        ...state,
        active: true,
        currentContracts: blockchainConfig[MUMBAI_ID].contracts,
        web3Provider: ethereumHandler.web3,
        account: ethereumHandler.account,
        currentWallet: ethereumHandler.currentWallet,
        currentNetwork: ethereumHandler.currentNetwork
      }
    default:
      return state
  }
}

export default ethereumContractReducer
