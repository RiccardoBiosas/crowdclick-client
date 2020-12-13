// theirs
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
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
import {
  PUBLISHER_DASHBOARD_ROUTE,
  USER_TASKS_LIST_ROUTE
} from '../../constants/config/routes-config'
// assets
import { kittenWarning, publisherWithdrawal } from '../../assets'

const PublisherWithdraw = ({ contract, account }) => {
  const [publisherBalance, setPublisherBalance] = useState()
  const history = useHistory()
  const { state } = useLocation()
  console.log('PUBLISHER WITHDRAW LOCATION: ', state)

  useLayoutEffect(() => {
    if (!state || !state.campaignUrl) {
      history.push(PUBLISHER_DASHBOARD_ROUTE)
    }
  }, [state])

  useEffect(() => {
    if (!publisherBalance) {
      fetchBalance()
    }
  }, [publisherBalance])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.balanceOfPublisher(account)
    console.log(balance)
    setPublisherBalance(balance)
  })

  return (
    <StyledGeneralCardLayout>
      <div>
        <h1>Withdraw Your Publisher's campaign budget</h1>
      </div>
      <StyledGeneralCardWrapper>
        {publisherBalance ? (
          <StyledGeneralHeadingTwo
            headingColor='#272833CC'
            paragraphLineHeight='1.4'
            headingFontSize='1.4rem'
            headingFontWeight='500'
          >
            Your current earnings amount to:{' '}
            <span style={{ fontWeight: '900' }}>{publisherBalance}</span>{' '}
            ethereum{' '}
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
              onClick={() => history.push(PUBLISHER_DASHBOARD_ROUTE)}
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

export default PublisherWithdraw
