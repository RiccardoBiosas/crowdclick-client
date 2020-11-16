// theirs
import React, { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
// styles
import StyledGeneralCardLayout from '../../shared/styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../shared/styles/StyledGeneralCardWrapper'
import StyledGlobalButton from '../../shared/styles/StyledGeneralButton'
import StyledGeneralColumnWrapper from '../../shared/styles/StyledGeneralColumnWrapper'

const WithdrawBalance = ({ contract, account }) => {
  const [userBalance, setUserBalance] = useState()

  useEffect(() => {
    if (!userBalance) {
      fetchBalance()
    }
  }, [userBalance])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.functions.balancesOfUser(account)
    const balanceToEther = ethers.utils.formatEther(balance)
    setUserBalance(balanceToEther)
  })

  const withdrawBalance = async () => {
    const balanceToWei = ethers.utils.parseEther(
      parseFloat(userBalance, 10)
        .toFixed(6)
        .toString()
    )
    const tx = await contract.withdrawUserBalance(balanceToWei)
  }
  return (
    <StyledGeneralCardLayout>
      <div>
        <h1>Withdraw Your Funds As A User</h1>
      </div>
      <StyledGeneralCardWrapper>
        <p>Your current earnings: {userBalance || '0'} ethereum </p>
        <StyledGeneralColumnWrapper>
          {/* <StyledGlobalButton
            buttonWidth='180'
            buttonColor='blue'
            buttonTextColor='white'
            onClick={() => withdrawBalance()}
          >
            Confirm withdrawal
          </StyledGlobalButton> */}
        </StyledGeneralColumnWrapper>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  )
}

export default WithdrawBalance
