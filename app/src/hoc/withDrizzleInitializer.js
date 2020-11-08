// theirs
import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux'
// components
import NetworkFallback from '../routes/network-fallback'
import LoadingIcon from '../shared/components/loadingIcons/LoadingIcon'
import SignupFallback from '../routes/register/screen/SignupFallback'
import config from '../config/env-config'
import { ethers } from 'ethers'

const WaitForDrizzleOrFail = () => {
  const [waitingTimeExpired, setWaitingTimeExpired] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setWaitingTimeExpired(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [waitingTimeExpired])

  if (waitingTimeExpired) {
    return <NetworkFallback />
  }
  return <LoadingIcon />
}

const withDrizzleInitializer = ComposedComponent => {
  const web3Data = useSelector(
    ({ ethereumContractReducer }) => ethereumContractReducer
  )
  // const [currentWeb3Data, setCurrentWeb3Data] = useState(web3Data)
  // useEffect(() => {
  //   setCurrentWeb3Data(web3Data)
  // }, [web3Data])
  console.log('')
  console.log('WHAT IS WEB3DATA? ')
  console.log(web3Data)
  const {
    active,
    web3Provider,
    currentNetwork,
    account,
    currentWallet,
    currentContracts,
  } = web3Data
  console.log('INSIDE WITH DRIZZLE INTIALIZER ##################')
  console.log('is active? ', active)
  console.log('check account ', account)
  console.log('current network ', currentNetwork)
  console.log('current wallet ', currentWallet)
  console.log('current web3provider', web3Provider)
  console.log('check window.web 3', window.ethereum)
  console.log('INSIDE WITH DRIZZLE INTIALIZER ##################')
  
  if (!active) {
    return <SignupFallback />
  }
  if(active && !currentContracts) {
    return <NetworkFallback currentNetwork={currentNetwork} />
  }

  const provider = new ethers.providers.Web3Provider(web3Provider.currentProvider)
  const contractAddress = currentContracts.networks[currentNetwork].address
  
  const contract = new ethers.Contract(
    contractAddress,
    currentContracts.abi,
    provider.getSigner()
  )
  return (
    <>
      <ComposedComponent
        contract={contract}
        address={contractAddress}
        account={account}
        currentWallet={currentWallet}
        currentNetwork={currentNetwork}
      />
    </>
  )
}

export default withDrizzleInitializer
