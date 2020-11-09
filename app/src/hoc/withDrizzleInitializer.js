// theirs
import React from 'react'
import { ethers } from 'ethers'
import { useSelector } from 'react-redux'
// components
import NetworkFallback from '../routes/network-fallback'
import SignupFallback from '../routes/register/screen/SignupFallback'

const withDrizzleInitializer = ComposedComponent => {
  const web3Data = useSelector(
    ({ ethereumContractReducer }) => ethereumContractReducer
  )
  const {
    active,
    web3Provider,
    currentNetwork,
    account,
    currentWallet,
    currentContracts
  } = web3Data
  console.log('INSIDE WITH DRIZZLE INTIALIZER ##################')
  console.log('redux web3 data', web3Data)
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
  if (active && !currentContracts) {
    return <NetworkFallback currentNetwork={currentNetwork} />
  }

  const provider = new ethers.providers.Web3Provider(
    web3Provider.currentProvider
  )
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
        currentWallet={currentWallet}
      />
    </>
  )
}

export default withDrizzleInitializer
