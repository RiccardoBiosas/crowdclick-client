import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router'
import { useWeb3 } from '@openzeppelin/network/react'
import StyledGeneralButton  from '../../../styles/StyledGeneralButton'
import { FirstDivGroup } from './styles/DesktopNavbarStyles'
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
  const web3Context = useWeb3(process.env.REACT_APP_INFURA_ROPSTEN)
  const history = useHistory()

  return (
    <FirstDivGroup>
      <div>
        <GetBalanceComponent web3Context={web3Context} />
      </div>
      <div>
        <StyledGeneralButton
          buttonColor={'blue'}
          buttonTextColor={'#FFFFFF'}
          buttonWidth={140}
          onClick={() => history.push(USER_WITHDRAW_ROUTE)}
        >
          Withdraw
        </StyledGeneralButton>
      </div>
    </FirstDivGroup>
  )
}
