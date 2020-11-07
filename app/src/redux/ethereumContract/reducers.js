import config from '../../config/env-config'
import { Drizzle } from '@drizzle/store'

import { MAINNET_ID, ROPSTEN_ID, GOERLI_ID, MUMBAI_ID } from './actions'
import { MAINNET_TYPE, ROPSTEN_TYPE, GOERLI_TYPE, MUMBAI_TYPE } from './actions'
import Web3 from 'web3'
import ethereumHandler from '../../utils/blockchain/ethereumHandler'

const blockchainConfig = config.blockchain

// TO DO: improve & remove side effect/reliance on local storage
const myOptions = {}
const initialContractState = {
  currentContract:
    window.localStorage.getItem('chainId') &&
    blockchainConfig[Number(window.localStorage.getItem('chainId'))].contracts,
  drizzleOptions: {
    syncAlways: true,
    contracts:
      window.localStorage.getItem('chainId') &&
      blockchainConfig[Number(window.localStorage.getItem('chainId'))]
        .contracts,
    events: {}
  }
}

const ethereumContractReducer = (state = initialContractState, action) => {
  console.log(
    'ETHEREUM CONTRACT REDUCER ABOUT TO BE UPDATED --- ACTION: ',
    action
  )
  console.log('ethereum contract reducer state is: ', state)
  switch (action.type) {
    case MAINNET_TYPE:
      return {
        ...state,
        drizzleOptions: { ...state.drizzleOptions, contracts: null }
      }
    case ROPSTEN_TYPE:
      return {
        ...state,
        drizzleOptions: { ...state.drizzleOptions, contracts: null }
      }
    case GOERLI_TYPE:
      console.log('goerli TYPE WAS HIT')
      return {
        ...state,
        drizzleOptions: {
          ...state.drizzleOptions,
          contracts: blockchainConfig[GOERLI_ID].contracts,
          web3: { customProvider: new Web3(ethereumHandler.web3) }
        }
      }
    case MUMBAI_TYPE:
      console.log('MUMBAI TYPE WAS HIT')
      return {
        ...state,
        drizzleOptions: {
          ...state.drizzleOptions,
          contracts: blockchainConfig[MUMBAI_ID].contracts,
          web3: {
            customProvider: new Web3(ethereumHandler.web3)
          }
        }
      }
    default:
      return state
  }
}

export default ethereumContractReducer

// import config from '../../config/env-config'
// import { Drizzle } from '@drizzle/store'

// import { MAINNET_ID, ROPSTEN_ID, GOERLI_ID, MUMBAI_ID } from './actions'
// import { MAINNET_TYPE, ROPSTEN_TYPE, GOERLI_TYPE, MUMBAI_TYPE } from './actions'

// const blockchainConfig = config.blockchain

// // TO DO: improve & remove side effect/reliance on local storage
// const initialContractState = {
//   currentContract:
//     window.localStorage.getItem('chainId') &&
//     blockchainConfig[Number(window.localStorage.getItem('chainId'))].contracts
// }

// const ethereumContractReducer = (state = initialContractState, action) => {
//   console.log('ETHEREUM CONTRACT REDUCER ABOUT TO BE UPDATED --- ACTION: ', action)
//   console.log('ethereum contract reducer state is: ', state)
//   switch (action.type) {
//     case MAINNET_TYPE:
//       return { ...state, currentContract: null }
//     case ROPSTEN_TYPE:
//       return { ...state, currentContract: null }
//     case GOERLI_TYPE:
//       return {
//         ...state,
//         currentContract: blockchainConfig[GOERLI_ID].contracts
//       }
//     case MUMBAI_TYPE:
//       return {
//         ...state,
//         currentContract: blockchainConfig[MUMBAI_ID].contracts
//       }
//     default:
//       return initialContractState
//   }
// }

// export default ethereumContractReducer
