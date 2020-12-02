import config from '../../config/env-config'
import Web3 from 'web3'
import { GOERLI_ID, MUMBAI_ID } from './actions'
import {
  MAINNET_TYPE,
  ROPSTEN_TYPE,
  GOERLI_TYPE,
  MUMBAI_TYPE,
  CACHED_WEB3_FROM_STORAGE
} from './actions'
import ethereumHandler from '../../utils/blockchain/ethereumHandler'
import {
  SCOPED_LOCAL_STORAGE_CHAIN_ID,
  SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY
} from '../../utils/blockchain/constants'

const blockchainConfig = config.blockchain

const cachedWeb3 =
  window.localStorage.getItem(SCOPED_LOCAL_STORAGE_CHAIN_ID) &&
  parseInt(window.localStorage.getItem(SCOPED_LOCAL_STORAGE_CHAIN_ID), 10)
const cachedPublicKey =
  window.localStorage.getItem(SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY) || undefined

const initialWeb3State =
  cachedWeb3 && cachedPublicKey
    ? {
        active: true,
        web3Provider: new Web3(window.ethereum),
        currentNetwork: cachedWeb3,
        account: cachedPublicKey,
        currentWallet: 'metamask',
        currentContracts: blockchainConfig[cachedWeb3].contracts,
        wasStorageChecked: true
      }
    : {
        active: false,
        web3Provider: null,
        currentNetwork: null,
        account: null,
        currentWallet: null,
        currentContracts: null,
        wasStorageChecked: false
      }

const ethereumContractReducer = (state = initialWeb3State, action) => {
  switch (action.type) {
    case CACHED_WEB3_FROM_STORAGE:
      return {
        ...state,
        ...action.payload
      }
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
      console.log('goerli action was called')
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
      console.log('mumbai action was called')
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
