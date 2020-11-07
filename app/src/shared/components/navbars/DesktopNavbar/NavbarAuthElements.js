// theirs
import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useWeb3 } from '@openzeppelin/network/react'
// components
import MaticWidgetAll from '../../MaticWidget/all'
// styles
import StyledGeneralButton from '../../../styles/StyledGeneralButton'
import { StyledFirstDivGroup } from './styles/DesktopNavbarStyles'
// consntants
import { USER_WITHDRAW_ROUTE } from '../../../../config/routes-config'
import WithdrawBalance from '../../../../routes/withdraw/WithdrawComponent'
import ethereumHandler from '../../../../utils/blockchain/ethereumHandler'

export const GetBalanceComponent = ({ web3Context }) => {
  const [balance, setBalance] = useState(0)
  const { networkId, accounts, lib } = web3Context

  const getBalance = useCallback(async () => {
    let balance =
      accounts && accounts.length > 0
        ? lib.utils.fromWei(await lib.eth.getBalance(accounts[0]), 'ether')
        : 0
    setBalance(balance)
  }, [accounts, lib.eth, lib.utils])

  useEffect(() => {
    getBalance()
  }, [accounts, getBalance, networkId])

  return <p>{balance ? parseFloat(balance).toFixed(3) : '0.00'} ETH</p>
}

export const NavbarAuthElements = () => {
  // const contractData = useSelector(
  //   ({ ethereumContractReducer }) => ethereumContractReducer
  // )
  const currentNetwork = ethereumHandler.currentNetwork
  console.log('contract data navbar is --> ', currentNetwork)
  const web3Context = useWeb3(process.env.REACT_APP_INFURA_GOERLI)

  const history = useHistory()

  return (
    <StyledFirstDivGroup>
      <div>
        <GetBalanceComponent web3Context={web3Context} />
      </div>
      <div>
        {currentNetwork === 80001 ? (
          <MaticWidgetAll />
        ) : (
          <StyledGeneralButton
            buttonWidth='135'
            buttonColor='blue'
            buttonTextColor='#FFFFFF'
            onClick={() => history.push(USER_WITHDRAW_ROUTE)}
          >
            withdraw
          </StyledGeneralButton>
        )}
      </div>
    </StyledFirstDivGroup>
  )
}
