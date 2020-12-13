// theirs
import React, { useEffect, useState } from 'react'
// components
import NetworkFallback from '../routes/network-fallback'
import SignupFallback from '../routes/register/screen/SignupFallback'
import ethereumHandler from '../services/blockchain/ethereumHandler'

const WithWeb3Initializer = ComposedComponent => {
  const [web3Singleton, setWeb3Singleton] = useState(() =>
    ethereumHandler.getWeb3Singleton()
  )

  useEffect(() => {
    if (!web3Singleton.wasLocalStorageChecked) {
      console.log('localstorage was not checked: ', web3Singleton)
      const checkLocalStorage = async () => {
        await ethereumHandler.initCachedWeb3()
        setWeb3Singleton(ethereumHandler.getWeb3Singleton())
      }
      checkLocalStorage()
    }
  }, [])

  console.groupCollapsed('withWeb3Initializer')
  console.log('singleton state: ', ethereumHandler.getWeb3Singleton())
  console.log('active: ', web3Singleton.active)
  console.log('current account: ', web3Singleton.account)
  console.log('current network: ', web3Singleton.currentNetwork)
  console.log('current wallet: ', web3Singleton.currentWallet)
  console.log('current web3provider: ', web3Singleton.web3Provider)
  console.log('check window.web3: ', window.ethereum)
  console.log('current contract: ', web3Singleton.currentContract)
  console.groupEnd()

  if (!web3Singleton.active) {
    setTimeout(() => {
      return <SignupFallback />
    }, 2000)
  }

  if (web3Singleton.active && !web3Singleton.currentContract) {
    setTimeout(() => {
      return <NetworkFallback currentNetwork={web3Singleton.currentNetwork} />
    }, 2000)
  }

  return (
    <ComposedComponent
      contract={web3Singleton.currentContract}
      contractAddress={web3Singleton.contractAddress}
      account={web3Singleton.account}
      currentWallet={web3Singleton.currentWallet}
      currentNetwork={web3Singleton.currentNetwork}
      currentChainId={web3Singleton.currentChainId}
      web3Provider={web3Singleton.web3Provider}
    />
  )
}

export default WithWeb3Initializer
