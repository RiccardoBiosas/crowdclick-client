export const MAINNET_TYPE = 'MAINNET'
export const ROPSTEN_TYPE = 'ROPSTEN'
export const GOERLI_TYPE = 'GOERLI'
export const MUMBAI_TYPE = 'MUMBAI'

export const MAINNET_ID = 1
export const ROPSTEN_ID = 3
export const GOERLI_ID = 5
export const MUMBAI_ID = 80001

export const networkNameToIdLookup = {
  [MAINNET_TYPE]: MAINNET_ID,
  [ROPSTEN_TYPE]: ROPSTEN_ID,
  [GOERLI_TYPE]: ROPSTEN_ID,
  [MUMBAI_TYPE]: MUMBAI_ID
}

export const ethereumNetworkMainnetAction = {
  type: MAINNET_TYPE
}

export const ethereumNetworkRopstenAction = {
  type: ROPSTEN_TYPE
}

export const ethereumNetworkGoerliAction = {
  type: GOERLI_TYPE
}

export const ethereumNetworkMumbaiAction = {
  type: MUMBAI_TYPE
}
