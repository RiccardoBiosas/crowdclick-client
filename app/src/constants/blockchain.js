export const WALLETS = Object.freeze({
  PORTIS: 'PORTIS',
  METAMASK: 'METAMASK',
  WALLETCONNECT: 'WALLET_CONNECT'
})

export const CONNECTORS_ERROR = Object.freeze({
  NOT_SUPPORTED_NETWORK:
    "Network not supported! Please change your wallet's network and try again.",
  NOT_SUPPORTED_WALLET: 'Wallet not supported!',
  WRONG_SIGNATURE: 'Wrong signature! Please refresh and try again.',
  GENERIC_ERROR: 'Something went wrong! Please try again.',
  NO_CACHED_CONNECTION: 'Sign in again!'
})

export const MAINNET = 'MAINNET'
export const ROPSTEN = 'ROPSTEN'
export const RINKEBY = 'RINKEBY'
export const GOERLI = 'GOERLI'
export const MUMBAI = 'MUMBAI'
export const KOVAN = 'KOVAN'
const MAINNET_ID = 1
const ROPSTEN_ID = 3
const RINKEBY_ID = 4
const GOERLI_ID = 5
const KOVAN_ID = 42
const MUMBAI_ID = 80001

export const networkNameToIdLookup = {
  [MAINNET]: MAINNET_ID,
  [ROPSTEN]: ROPSTEN_ID,
  [KOVAN]: KOVAN_ID,
  [RINKEBY]: RINKEBY_ID,
  [GOERLI]: GOERLI_ID,
  [MUMBAI]: MUMBAI_ID
}

export const CHAIN_ID_TO_NETWORK_NAME = {
  1: MAINNET,
  3: ROPSTEN,
  4: RINKEBY,
  5: GOERLI,
  42: KOVAN,
  80001: MUMBAI
}
