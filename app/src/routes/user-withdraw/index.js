// theirs
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
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
import { USER_TASKS_LIST_ROUTE } from '../../constants/config/routes-config'
// assets
import { kittenWarning, userWithdrawal } from '../../assets'
import StyledGeneralRowWrapper from '../../shared/styles/StyledGeneralRowWrapper'

const UserWithdraw = ({ contract }) => {
  const history = useHistory()
  const [userBalance, setUserBalance] = useState()

  /************************************
   * contract is a dependency for when
   * the web3 session is loaded from
   * localstorage
   ************************************
   */
  useEffect(() => {
    if (!userBalance && contract) {
      fetchBalance()
    }
  }, [userBalance, contract])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.balanceOfUser()
    setUserBalance(balance)
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
        <h1>Withdraw your user funds</h1>
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
            <span style={{ fontWeight: '900' }}>{userBalance}</span> ETH{' '}
          </StyledGeneralHeadingTwo>
        ) : (
          <StyledGeneralParagraph
            paragraphColor='#272833CC'
            paragraphLineHeight='1.4'
          >
            Your current earnings amount to: <span>0.0</span> ETH{' '}
          </StyledGeneralParagraph>
        )}
        <div>
          <img src={userWithdrawal} alt='not-enough-balance' />
        </div>

        <StyledGeneralParagraph
          paragraphColor='#272833CC'
          paragraphLineHeight='1.8'
          paragraphMargin='2rem'
        >
          The current minimum withdrawal amount is{' '}
          <span style={{ fontWeight: '900' }}>0.03</span> ETH <br />
        </StyledGeneralParagraph>
        <StyledGeneralParagraph
          paragraphColor='#272833CC'
          paragraphLineHeight='1.8'
          paragraphMargin='2rem'
        >
          <Link to={USER_TASKS_LIST_ROUTE}>Go to our tasks dashboard</Link>,
          visit a website, share your feedback and <br /> you will soon reach
          that milestone!
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
            {/* {web3Data.currentNetwork === 80001 && <MaticWidgetAll />} */}
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

export default UserWithdraw
