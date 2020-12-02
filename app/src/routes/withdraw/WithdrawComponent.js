// theirs
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { ethers } from 'ethers'
// components
import MaticWidgetAll from '../../shared/components/MaticWidget/all'
// styles
import StyledGeneralCardLayout from '../../shared/styles/StyledGeneralCardLayout'
import StyledGeneralCardWrapper from '../../shared/styles/StyledGeneralCardWrapper'
import StyledGlobalButton from '../../shared/styles/StyledGeneralButton'
import StyledGeneralColumnWrapper from '../../shared/styles/StyledGeneralColumnWrapper'
import StyledGeneralParagraph from '../../shared/styles/StyledGeneralParagraph'
import { StyledGeneralHeadingTwo } from '../../shared/styles/StyledGeneralHeadings'
// constants
import { USER_TASKS_LIST_ROUTE } from '../../config/routes-config'
// assets
import { kittenWarning } from '../../assets'
import StyledGeneralRowWrapper from '../../shared/styles/StyledGeneralRowWrapper'

const WithdrawBalance = ({ contract, account }) => {
  const history = useHistory()
  const web3Data = useSelector(
    ({ ethereumContractReducer }) => ethereumContractReducer
  )

  console.log('withdraw balance account: ', account)
  const [userBalance, setUserBalance] = useState()

  useEffect(() => {
    if (!userBalance) {
      fetchBalance()
    }
  }, [userBalance])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.functions.balancesOfUser(
      account.toLowerCase()
    )
    console.log(balance)
    const balanceToEther = ethers.utils.formatEther(balance)
    setUserBalance(balanceToEther)
  })

  // const withdrawBalance = async () => {
  //   const balanceToWei = ethers.utils.parseEther(userBalance)
  //   console.log(balanceToWei)
  //   const tx = await contract.functions.withdrawUserBalance(balanceToWei, {
  //     gasLimit: 1000000
  //   })
  //   console.log(tx)
  // }

  return (
    <StyledGeneralCardLayout>
      <div>
        <h1>Withdraw Your Funds As A User</h1>
      </div>
      <StyledGeneralCardWrapper>
        {userBalance ? (
          <StyledGeneralHeadingTwo
            headingColor='#272833CC'
            paragraphLineHeight='1.4'
            headingFontSize='1.4rem'
            headingFontWeight='500'
          >
            Your current earnings amount to:{' '}
            <span style={{ fontWeight: '900' }}>{userBalance}</span> ethereum{' '}
          </StyledGeneralHeadingTwo>
        ) : (
          <StyledGeneralParagraph
            paragraphColor='#272833CC'
            paragraphLineHeight='1.4'
          >
            Your current earnings amount to: <span>0.0</span> ethereum{' '}
          </StyledGeneralParagraph>
        )}
        <div>
          <img src={kittenWarning} alt='not-enough-balance' />
        </div>

        <StyledGeneralParagraph
          paragraphColor='#272833CC'
          paragraphLineHeight='1.8'
        >
          The current minimum withdrawal amount is{' '}
          <span style={{ fontWeight: '900' }}>0.03</span> ethereum <br />
          <Link to={USER_TASKS_LIST_ROUTE}>Go to our tasks dashboard</Link>,
          visit a website, share your feedback and <br /> you will soon reach
          that milestone!{' '}
        </StyledGeneralParagraph>

        <StyledGeneralColumnWrapper>
          <StyledGeneralColumnWrapper columnJustify='space-around'>
            <StyledGlobalButton
              buttonWidth='180'
              buttonColor='green'
              buttonTextColor='white'
              onClick={() => history.push(USER_TASKS_LIST_ROUTE)}
            >
              Tasks dashboard
            </StyledGlobalButton>
            {web3Data.currentNetwork === 80001 && <MaticWidgetAll />}
          </StyledGeneralColumnWrapper>
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
