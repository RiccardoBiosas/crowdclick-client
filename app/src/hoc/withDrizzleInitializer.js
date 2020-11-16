// theirs
import React, {useEffect} from 'react'
import { ethers } from 'ethers'
import { useSelector, useDispatch } from 'react-redux'
// components
import NetworkFallback from '../routes/network-fallback'
import SignupFallback from '../routes/register/screen/SignupFallback'
import { SCOPED_LOCAL_STORAGE_CHAIN_ID, SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY } from '../utils/blockchain/constants'
import ethereumHandler from '../utils/blockchain/ethereumHandler'
import crowdclickClient from '../utils/api/crowdclick'


const withDrizzleInitializer = ComposedComponent => {
  const web3Data = useSelector(
    ({ ethereumContractReducer }) => ethereumContractReducer
  )
  const dispatch = useDispatch()
  const {
    active,
    web3Provider,
    currentNetwork,
    account,
    currentWallet,
    currentContracts,
    wasStorageChecked
  } = web3Data

  useEffect(() => {
    if(wasStorageChecked) {
      console.log('STORAGE WAS CHECKED, HOC MAKING SURE THAT EVERYTHING MATCHES WEB3 CONF')
      const fetchAccounts = async() => {  
        const accounts = await web3Provider.eth.getAccounts()
        console.log('accounts hoc wasstoragechecked true')
        console.log(accounts)
        const account = accounts[0]
        if(account.toLowerCase() !== window.localStorage.getItem(SCOPED_LOCAL_STORAGE_USER_PUBLIC_KEY).toLowerCase()) {
          console.log('about to logout trigger debugger')          
          await ethereumHandler.disconnectFromWeb3AndLogout()
        }
      }
      fetchAccounts()
    }
  }, [])
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
