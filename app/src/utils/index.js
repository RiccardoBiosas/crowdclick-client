// theirs
import { ethers, providers, utils } from 'ethers'
import Web3 from 'web3'
import { WALLETS } from '../constants/blockchain'
import config from '../constants/config/env-config'
import {
  SCOPED_LOCAL_STORAGE_CHAIN_ID,
  SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY,
  SCOPED_LOCAL_STORAGE_USER_WALLET
} from '../services/blockchain/constants'
import { portisConnectors } from '../repositories/portisConnector'
import { CrowdclickEscrowContractHandler } from '../services/blockchain/crowdclickEscrowContractHandler'
import walletConnectProvider from '../repositories/walletConnectConnector'

const floatingPrecision = config.ux.floatingPrecision

export const splitTextWithEllipsis = (txt, displayChars) => {
  const indexFirstHalfSplit = displayChars
    ? displayChars + 1
    : Math.floor(txt.length / 2)
  const indexSecondHalfSplit = displayChars
    ? txt.length - displayChars
    : Math.floor(txt.length / 2)
  const textFirstHalf = txt.slice(0, indexFirstHalfSplit)
  const textSecondHalf = txt.slice(indexSecondHalfSplit, txt.length)
  return textFirstHalf.concat('...').concat(textSecondHalf)
}

export const isWhatPercentage = (x, y) => {
  const percentage = (x * 100) / y
  const percentageToTwoDecimals = percentage.toFixed(2)
  return percentageToTwoDecimals
}

export const whatIsXPercentOfY = (x, y) => {
  const result = (x / 100) * y
  return result
}

export const scrollToCoordinate = (coordX, scrollBehavior = 'smooth') => {
  window.scrollBy({ top: [coordX], behavior: scrollBehavior })
}

export const initWeb3Session = (walletType, web3) => {
  switch (walletType) {
    case WALLETS.WALLETCONNECT:
      const web3Provider = new providers.Web3Provider(web3)
      return web3Provider.provider.wc
    case WALLETS.PORTIS:
      return new Web3(web3)
    default:
      return new ethers.providers.Web3Provider(web3)
  }
}

export const getWeb3Account = async (web3Provider, walletType) => {
  console.log('wallet type: ', walletType)
  let accounts
  switch (walletType) {
    case WALLETS.PORTIS:
      accounts = await web3Provider.eth.getAccounts()
      return accounts[0]
    default:
      web3Provider =
        web3Provider || new ethers.providers.Web3Provider(window.ethereum)
      accounts = web3Provider.accounts || (await web3Provider.listAccounts())
      return accounts[0]
  }
}

export const getWeb3NetworkId = async (web3Provider, walletType) => {
  console.log('wallet type util: ', walletType)
  console.log('web3provider getweb3networkid ', web3Provider)
  switch (walletType) {
    case WALLETS.WALLETCONNECT:
      return 5 // hardcoded, CHANGE IT!
    case WALLETS.PORTIS:
      return await web3Provider.eth.getChainId()
    default:
      const currentNetwork = await web3Provider.getNetwork()
      return currentNetwork.chainId
  }
}

export const getWeb3NetworkName = async web3Provider => {
  const currentNetwork = await web3Provider.getNetwork().networkName
  return currentNetwork
}

export const web3SignMessage = async (walletType, web3Provider, nonce) => {
  console.log('web3signmessage web3provider: ', web3Provider)
  let currentAccount
  switch (walletType) {
    case WALLETS.WALLETCONNECT:
      currentAccount = await getWeb3Account(web3Provider, walletType)
      return await web3Provider.signPersonalMessage([nonce, currentAccount])
    case WALLETS.PORTIS:
      currentAccount = await getWeb3Account(web3Provider, walletType)
      return await web3Provider.eth.personal.sign(
        nonce,
        currentAccount,
        console.log
      )
    default:
      const signer = web3Provider.getSigner()
      return await signer.signMessage(nonce)
  }
}

export const parseEthersToWei = ethersAmount => {
  return utils.parseEther(ethersAmount.toFixed(floatingPrecision).toString())
}

export const parseWeiToEtherString = weiAmount => {
  return utils.formatEther(weiAmount)
}

export const getUserAddressFromLocalStorage = () => {
  const userAddress = window.localStorage.getItem(
    SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY
  )
  if (userAddress) {
    return userAddress.toLowerCase()
  }
  return false
}

export const stringLowerCaseComparison = (firstString, secondString) => {
  return firstString.toLowerCase() === secondString.toLowerCase()
}

export const cacheWeb3DataToLocalStorage = (
  currentAccount,
  currentChainId,
  currentWallet
) => {
  window.localStorage.setItem(SCOPED_LOCAL_STORAGE_CHAIN_ID, currentChainId)
  window.localStorage.setItem(
    SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY,
    currentAccount
  )
  window.localStorage.setItem(SCOPED_LOCAL_STORAGE_USER_WALLET, currentWallet)
}

export const cleanLocalStorage = () => {
  window.localStorage.removeItem(SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY)
  window.localStorage.removeItem(SCOPED_LOCAL_STORAGE_CHAIN_ID)
}

export const checkSupportedChain = chainId => {
  /** check that chainId is one of the supported chains */
  const chainIdNumber = Number(chainId)
  if (chainIdNumber === 5 || chainIdNumber === 80001) {
    return config.blockchain[chainIdNumber]
  }
  return false
}

/** maybe this should belong to services, as it makes use of repositories. use partial application?  chainId, currentWallet, fn
// const checkSupportedChain*/
export const getWalletConnectorByNetwork = (chainId, walletType) => {
  const selectedChain = checkSupportedChain(chainId)
  if (selectedChain) {
    switch (walletType) {
      case WALLETS.PORTIS:
        return portisConnectors(selectedChain.chainName)
      case WALLETS.WALLETCONNECT:
        return walletConnectProvider
      default:
        return
    }
  }
  return selectedChain
}

export const getContractByNetwork = (
  chainId,
  web3Provider,
  currentAccount,
  currentWallet
) => {
  const selectedChain = checkSupportedChain(chainId)
  if (selectedChain) {
    const contractAddress =
      config.blockchain[chainId].contractsAddress.crowdclickEscrowAddress
    console.log('node: ', config.blockchain[chainId].node)
    const contract = new CrowdclickEscrowContractHandler(
      contractAddress,
      currentWallet === WALLETS.METAMASK
        ? web3Provider.provider
        : config.blockchain[chainId].node,
      currentAccount
    )
    return {
      contract,
      contractAddress
    }
  }
}

export const waitForTransactionReceipt = async (txHash, web3Provider) => {
  console.log('txhash: ', txHash)
  console.log(' waitForTransactionReceipt web3provider: ', web3Provider)
  const receipt = await web3Provider.waitForTransaction(txHash)
  console.log('receipt: ', receipt)
  return receipt
}

export const getBlockchainExplorerByNetwork = chainId => {
  const selectedChain = checkSupportedChain(chainId)
  if (selectedChain) {
    return config.blockchain[chainId].chainExplorerTransactions
  }
}

export const parseIntegerStringToFloatString = n => {
  const sanitizedNumber = Number(n)
  if (typeof sanitizedNumber === 'number' && !Number.isNaN(sanitizedNumber)) {
    return parseFloat(n, 10)
      .toFixed(2)
      .toString()
  }
  return ''
}

export const convertChainIdToNetworkName = chainId => {
  const chainConfig = checkSupportedChain(chainId)
  if (chainConfig) {
    return chainConfig.chainName
  }
  return false
}

// util to generate base boilerplate for error/successful connection attempt
