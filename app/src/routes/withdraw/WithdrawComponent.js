// theirs
import React, { useState, useEffect, useCallback } from 'react'
import { ethers } from 'ethers'
import web3 from 'web3'
// styles
import StyledGeneralCardLayout from '../../shared/styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../shared/styles/StyledGeneralCardWrapper'
import StyledGlobalButton from '../../shared/styles/StyledGeneralButton'
import StyledGeneralColumnWrapper from '../../shared/styles/StyledGeneralColumnWrapper'

const WithdrawBalance = ({ contract, account }) => {
  console.log('withdraw balance account: ', account)
  const [userBalance, setUserBalance] = useState()

  useEffect(() => {
    if (!userBalance) {
      fetchBalance()
    }
  }, [userBalance])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.functions.balancesOfUser(account)
    console.log(balance)
    const balanceToEther = ethers.utils.formatEther(balance)
    // const balanceToEther = web3.utils.fromWei(balance.toString())
    // console.log(balanceToEthera)
    setUserBalance(balanceToEther)
  })

  const withdrawBalance = async () => {
    // const balanceToWei = ethers.utils.parseEther(
    //   parseFloat(userBalance, 10)
    //     .toFixed(6)
    //     .toString()
    // )
    const balanceToWei = ethers.utils.parseEther(userBalance)

    // const balanceToWei = web3.utils.toWei(userBalance)
    console.log(balanceToWei)
    const tx = await contract.functions.withdrawUserBalance(balanceToWei, {
      gasLimit: 3000000
    })
    console.log(tx)
  }
  return (
    <StyledGeneralCardLayout>
      <div>
        <h1>Withdraw Your Funds As A User</h1>
      </div>
      <StyledGeneralCardWrapper>
        <p>Your current earnings: {userBalance || '0'} ethereum </p>
        <StyledGeneralColumnWrapper>
          <StyledGlobalButton
            buttonWidth='180'
            buttonColor='blue'
            buttonTextColor='white'
            onClick={() => withdrawBalance()}
          >
            Confirm withdrawal
          </StyledGlobalButton>
        </StyledGeneralColumnWrapper>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  )
}

export default WithdrawBalance
