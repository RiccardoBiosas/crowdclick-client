// theirs
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
// components
import MaticWidgetAll from '../../MaticWidget/all'
// styles
import StyledGeneralButton from '../../../styles/StyledGeneralButton'
import { StyledFirstDivGroup } from './styles/DesktopNavbarStyles'
// consntants
import { USER_WITHDRAW_ROUTE } from '../../../../config/routes-config'

export const NavbarAuthElements = () => {
  const web3Data = useSelector(
    ({ ethereumContractReducer }) => ethereumContractReducer
  )
  const [balance, setBalance] = useState(0)
  const history = useHistory()
  const fetchBalance = async () => {
    const web3Provider = web3Data.web3Provider
    const WeiBalance = await web3Provider.eth.getBalance(
      web3Data.account.toLowerCase(),
      console.log
    )
    const balance = web3Provider.utils.fromWei(WeiBalance, 'ether')
    setBalance(balance)
  }
  useEffect(() => {
    if (web3Data && web3Data.web3Provider) {
      fetchBalance()
    }
  }, [web3Data])

  return (
    <StyledFirstDivGroup>
      <div>
        <p>{balance ? parseFloat(balance).toFixed(3) : '0.00'} ETH</p>
      </div>
      <div>
        {web3Data.currentNetwork === 80001 ? (
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
