// theirs
import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router'
import { useWeb3 } from '@openzeppelin/network/react'
// components
import MaticWidgetAll from '../../MaticWidget/all'
// styles
import StyledGeneralButton from '../../../styles/StyledGeneralButton'
import { StyledFirstDivGroup } from './styles/DesktopNavbarStyles'
// consntants
import { USER_WITHDRAW_ROUTE } from '../../../../config/routes-config'

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
  const web3Context = useWeb3(process.env.REACT_APP_INFURA_GOERLI)
  // const history = useHistory()

  return (
    <StyledFirstDivGroup>
      <div>
        <GetBalanceComponent web3Context={web3Context} />
      </div>
      <div>
        <MaticWidgetAll />
      </div>
    </StyledFirstDivGroup>
  )
}
