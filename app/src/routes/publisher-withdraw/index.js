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
import { PUBLISHER_DASHBOARD_ROUTE } from '../../constants/config/routes-config'
// assets
import { endCampaign } from '../../assets'

const PublisherWithdraw = ({ contract, account, currentNetwork }) => {
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
    if (!publisherBalance && contract) {
      fetchBalance()
    }
  }, [publisherBalance])

  const fetchBalance = useCallback(async () => {
    const balance = await contract.balanceOfPublisher(account)
    setPublisherBalance(balance)
  })

  return (
    <StyledGeneralCardLayout>
      <div>
        <h1>Campaign withdrawal</h1>
      </div>
      <StyledGeneralCardWrapper>
        {publisherBalance ? (
          <StyledGeneralHeadingTwo
            headingColor='#272833CC'
            paragraphLineHeight='1.4'
            headingFontSize='1.4rem'
            headingFontWeight='500'
          >
            Your total publisher's balance amounts to:{' '}
            <span style={{ fontWeight: '900' }}>{publisherBalance}</span> ETH{' '}
          </StyledGeneralHeadingTwo>
        ) : (
          <StyledGeneralParagraph
            paragraphColor='#272833CC'
            paragraphLineHeight='1.4'
          >
            Your total publisher's balance amounts to: <span>0.0</span> ETH{' '}
          </StyledGeneralParagraph>
        )}
        <div>
          <img src={endCampaign} alt='end-campaign' />
        </div>
        <StyledGeneralParagraph
          paragraphColor='#272833CC'
          paragraphLineHeight='1.4'
        >
          The remaining balance on the selected campaign amounts to:{' '}
          <span>0.0</span> ETH{' '}
        </StyledGeneralParagraph>

        <StyledGeneralParagraph
          paragraphColor='#272833CC'
          paragraphLineHeight='1.8'
        >
          Are you sure you want to end the campaign? <br />
          Ending the campaign will withdraw the remaining funds to your wallet.
        </StyledGeneralParagraph>

        <StyledGeneralColumnWrapper>
          <StyledGlobalButton
            buttonWidth='180'
            buttonColor='blue'
            buttonTextColor='white'
            onClick={() => console.log('')}
          >
            End Campaign
          </StyledGlobalButton>
        </StyledGeneralColumnWrapper>
      </StyledGeneralCardWrapper>
    </StyledGeneralCardLayout>
  )
}

export default PublisherWithdraw
